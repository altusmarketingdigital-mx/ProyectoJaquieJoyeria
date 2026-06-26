import { sendMail } from './mail';
import { prisma } from '../prisma';
import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

// 1️⃣ Create a new custom order (client or admin testing)
export async function createOrder(req: Request, res: Response) {
  const { productId, customization } = req.body;
  const userId = (req as any).userId;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  try {
    const order = await prisma.customOrder.create({
      data: {
        user: { connect: { id: userId } },
        // For a real app you would store product reference, custom fields, etc.
        // Here we only set status = DRAFT by default via schema default.
        // You could also store a JSON blob with customization details.
        // Example:
        // customization: JSON.stringify(customization),
      },
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating order' });
  }
}

// 2️⃣ Get an order (client *or* admin). Security check is performed by middleware.
export async function getOrder(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const order = await prisma.customOrder.findUnique({
      where: { id },
      include: {
        quotation: true,
        stages: true,
        mediaProgress: true,
        payments: true,
        certificate: true,
      },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching order' });
  }
}

// 3️⃣ Admin creates/updates a quotation and generates a PDF using Puppeteer
export async function createQuotation(req: Request, res: Response) {
  const { id } = req.params; // order id
  const { title, description, price, currency } = req.body;
  try {
    // Ensure order exists
    const order = await prisma.customOrder.findUnique({ where: { id } });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Create or update quotation record
    const quotation = await prisma.quotation.upsert({
      where: { orderId: id },
      update: { title, description, price: price as any, currency },
      create: { orderId: id, title, description, price: price as any, currency },
    });

    // Generate simple HTML for PDF
    const html = `
      <html>
        <head>
          <style>
            body { font-family: 'Outfit', sans-serif; padding: 2rem; }
            .header { text-align: center; margin-bottom: 2rem; }
            .title { font-size: 1.8rem; font-weight: 600; color: hsl(35,70%,55%); }
            .section { margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Cotización</h1>
          </div>
          <div class="section"><strong>Título:</strong> ${title}</div>
          <div class="section"><strong>Descripción:</strong> ${description}</div>
          <div class="section"><strong>Precio:</strong> ${price} ${currency}</div>
          <div class="section"><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</div>
        </body>
      </html>
    `;

    // Launch headless Chrome (Puppeteer) and generate PDF buffer
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    // Save PDF to local filesystem (inside a `pdfs` folder)
    const pdfDir = path.resolve(__dirname, '../../../pdfs');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
    const pdfPath = path.join(pdfDir, `quotation_${quotation.id}.pdf`);
    fs.writeFileSync(pdfPath, pdfBuffer);

    // Update quotation record with pdfPath
    await prisma.quotation.update({
      where: { id: quotation.id },
      data: { pdfPath },
    });

    // Send email notification to client with PDF link
    const user = await prisma.user.findUnique({ where: { id: order.userId } });
    if (user && user.email) {
      const pdfUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/${id}/quotation/pdf`;
      const html = `<p>Estimado cliente,</p><p>Su cotización está lista. Puede descargarla <a href="${pdfUrl}">aquí</a>.</p>`;
      await sendMail(user.email, 'Cotización disponible', html);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating quotation PDF' });
  }
}

// 4️⃣ Serve the PDF file (client or admin)
export async function getQuotationPdf(req: Request, res: Response) {
  const { id } = req.params; // order id
  try {
    const quotation = await prisma.quotation.findUnique({ where: { orderId: id } });
    if (!quotation || !quotation.pdfPath) {
      return res.status(404).json({ error: 'Quotation PDF not found' });
    }
    const absolutePath = path.resolve(quotation.pdfPath);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: 'File missing on server' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    const readStream = fs.createReadStream(absolutePath);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching PDF' });
  }
}

// 5️⃣ Get all orders (admin only)
export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await prisma.customOrder.findMany({
      include: { user: true, quotation: true },
      orderBy: { createdAt: 'desc' }
    });
    
    // Map them to match the frontend expected format
    const mapped = orders.map(o => ({
      id: o.id,
      date: o.createdAt.toLocaleDateString(),
      client: o.user?.email || 'Desconocido',
      item: 'Joya Personalizada',
      total: o.quotation ? `$${o.quotation.price} ${o.quotation.currency}` : 'Pendiente',
      status: o.status.toLowerCase()
    }));
    
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching all orders' });
  }
}

// 6️⃣ Create a jewelry certificate and generate PDF
export async function createCertificate(req: Request, res: Response) {
  const { id } = req.params; // order id
  const { 
    modelo, 
    material, 
    weight, 
    carat, 
    pureza, 
    color, 
    corte, 
    piedraNatural, 
    imagenJoyaUrl,
    gemDetails 
  } = req.body;
  
  try {
    const order = await prisma.customOrder.findUnique({ where: { id } });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const certificateNumber = `CERT-${id.split('-')[0].toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const certificate = await prisma.jewelryCertificate.upsert({
      where: { orderId: id },
      update: { modelo, material, weight, carat, pureza, color, corte, piedraNatural, imagenJoyaUrl, gemDetails, certificateNumber },
      create: { orderId: id, modelo, material, weight, carat, pureza, color, corte, piedraNatural, imagenJoyaUrl, gemDetails, certificateNumber },
    });

    const imageUrlToUse = imagenJoyaUrl || 'https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/gem.svg';

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Certificado</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;1,400&family=Great+Vibes&display=swap');

          @page {
            margin: 0;
            size: 856px 540px;
          }

          body {
            margin: 0;
            padding: 0;
            width: 856px;
            height: 540px;
            background-color: #fff;
            -webkit-print-color-adjust: exact;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .card {
            width: 856px;
            height: 540px;
            background: #ffffff;
            position: relative;
            box-sizing: border-box;
            padding: 40px;
            /* Subtle inner border for premium feel */
            border: 8px solid #f8f9fa;
            box-shadow: inset 0 0 0 1px #e9ecef;
          }

          /* WATERMARK */
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Great Vibes', cursive;
            font-size: 150px;
            color: rgba(33, 60, 150, 0.03);
            white-space: nowrap;
            pointer-events: none;
            z-index: 0;
          }

          /* LEFT SIDE - TABLE */
          .table-container {
            position: absolute;
            top: 50px;
            left: 40px;
            width: 400px;
            z-index: 10;
          }

          table {
            border-collapse: separate;
            border-spacing: 4px;
            width: 100%;
          }

          th, td {
            height: 40px;
            font-family: 'Montserrat', sans-serif;
            text-align: center;
            vertical-align: middle;
          }

          .blue-box {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #ffffff;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 1px;
            border-radius: 4px;
            text-transform: uppercase;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .white-box {
            background-color: #fafafa;
            border: 1px solid #d1d5db;
            color: #1f2937;
            font-weight: 500;
            font-size: 14px;
            border-radius: 4px;
          }

          .col-label { width: 25%; }
          .col-val1 { width: 25%; }
          .col-piedra { width: 15%; padding: 0; }
          .col-val2 { width: 35%; }

          .vertical-text {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            text-align: center;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            letter-spacing: 2px;
            padding: 10px 0;
          }

          /* SIGNATURE */
          .signature-container {
            position: absolute;
            bottom: 40px;
            left: 50px;
            z-index: 10;
          }

          .signature {
            font-family: 'Great Vibes', cursive;
            font-size: 55px;
            color: #1e3c72;
            transform: rotate(-7deg);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
          }

          /* RIGHT SIDE - IMAGE & INFO */
          .jewelry-container {
            position: absolute;
            top: 50px;
            right: 40px;
            width: 320px;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
          }

          .jewelry-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
          }

          .info-box {
            position: absolute;
            bottom: 40px;
            right: 40px;
            width: 320px;
            background: linear-gradient(to right, #e5e7eb, #f3f4f6);
            border-radius: 12px;
            padding: 25px;
            box-sizing: border-box;
            border-left: 4px solid #1e3c72;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            z-index: 10;
          }

          .info-row {
            font-family: 'Montserrat', sans-serif;
            font-size: 13px;
            color: #374151;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }
          .info-row:last-child {
            margin-bottom: 0;
          }

          .info-row strong {
            color: #111827;
            font-weight: 600;
            width: 100px;
            display: inline-block;
            letter-spacing: 0.5px;
          }
          
          .cert-number {
            position: absolute;
            top: 20px;
            right: 20px;
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            color: #9ca3af;
            letter-spacing: 1px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="watermark">Jacqueline Tapia</div>
          <div class="cert-number">ID: ${certificateNumber}</div>
          
          <div class="table-container">
            <table>
              <tr>
                <th class="blue-box col-label">CARAT:</th>
                <td class="white-box col-val1">${carat || ''}</td>
                <th class="blue-box col-piedra" rowspan="4">
                  <div class="vertical-text">PIEDRA NATURAL</div>
                </th>
                <td class="white-box col-val2">${piedraNatural || ''}</td>
              </tr>
              <tr>
                <th class="blue-box col-label">PUREZA:</th>
                <td class="white-box col-val1">${pureza || ''}</td>
                <td class="white-box col-val2">${gemDetails || ''}</td>
              </tr>
              <tr>
                <th class="blue-box col-label">COLOR:</th>
                <td class="white-box col-val1">${color || ''}</td>
                <td class="white-box col-val2"></td>
              </tr>
              <tr>
                <th class="blue-box col-label">CORTE:</th>
                <td class="white-box col-val1">${corte || ''}</td>
                <td class="white-box col-val2"></td>
              </tr>
            </table>
          </div>

          <div class="signature-container">
            <div class="signature">jacqueline tapia</div>
          </div>

          <div class="jewelry-container">
            <img src="${imageUrlToUse}" class="jewelry-img" alt="Joya">
          </div>
            
          <div class="info-box">
            <div class="info-row"><strong>MODELO:</strong> <span>${modelo || ''}</span></div>
            <div class="info-row"><strong>MATERIAL:</strong> <span>${material || ''}</span></div>
            <div class="info-row"><strong>PESO:</strong> <span>${weight ? weight + ' grms' : ''}</span></div>
          </div>
        </div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Use fixed viewport and page size to ensure perfect rendering
    await page.setViewport({ width: 856, height: 540 });
    const pdfBuffer = await page.pdf({ 
      width: '856px', 
      height: '540px', 
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    await browser.close();

    const pdfDir = path.resolve(__dirname, '../../../pdfs');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
    const pdfPath = path.join(pdfDir, `certificate_${certificate.id}.pdf`);
    fs.writeFileSync(pdfPath, pdfBuffer);

    await prisma.jewelryCertificate.update({
      where: { id: certificate.id },
      data: { pdfPath },
    });

    res.status(201).json({ message: 'Certificate generated successfully', pdfUrl: `/api/orders/${id}/certificate/pdf` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating certificate PDF' });
  }
}

// 7️⃣ Serve the Certificate PDF file
export async function getCertificatePdf(req: Request, res: Response) {
  const { id } = req.params; // order id
  try {
    const certificate = await prisma.jewelryCertificate.findUnique({ where: { orderId: id } });
    if (!certificate || !certificate.pdfPath) {
      return res.status(404).json({ error: 'Certificate PDF not found' });
    }
    const absolutePath = path.resolve(certificate.pdfPath);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: 'File missing on server' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    const readStream = fs.createReadStream(absolutePath);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching PDF' });
  }
}
