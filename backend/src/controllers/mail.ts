import nodemailer from 'nodemailer';

// Configure a test transporter (console.log will act as email sending in dev)
const transporter = nodemailer.createTransport({
  // In a real app, configure SMTP credentials here.
  // For now we use "stream" transport which just prints the email to console.
  streamTransport: true,
  newline: 'unix',
  buffer: true,
});

export async function sendMail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: 'no-reply@jacqueline-tapia.com',
    to,
    subject,
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  // For dev, output the generated message source.
  console.log('=== Email Sent ===');
  console.log(info.message.toString());
}
