import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CatalogPage.css';

// Official pieces matching Jacqueline Tapia Joyería reference catalogue
const defaultCatalog = [
  // 12 Colecciones Oficiales de Anillos de Compromiso (jacquelinetapiajoyeria.com/product-category/anillos-de-compromiso/)
  { id: 'ac-1', name: 'Anillo de Compromiso | Alejandro', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Diamante Central y Laterales', price: 'Cotización personalizada', image: '/images/anillos_compromiso/alejandro.png' },
  { id: 'ac-2', name: 'Anillo de Compromiso | Antonio', category: 'Anillos de compromiso', material: 'Oro Amarillo 14K', gemstone: 'Diamante Solitario Natural', price: 'Cotización personalizada', image: '/images/anillos_compromiso/antonio.png' },
  { id: 'ac-3', name: 'Anillo de Compromiso | Armando', category: 'Anillos de compromiso', material: 'Oro Blanco 18K', gemstone: 'Diamante Corte Brillante', price: 'Cotización personalizada', image: '/images/anillos_compromiso/armando.png' },
  { id: 'ac-4', name: 'Anillo de Compromiso | David', category: 'Anillos de compromiso', material: 'Oro Amarillo 14K', gemstone: 'Esmeralda Natural Certificada', price: 'Cotización personalizada', image: '/images/anillos_compromiso/david.png' },
  { id: 'ac-5', name: 'Anillo de Compromiso | Ernesto', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Diamante Natural Solitario', price: 'Cotización personalizada', image: '/images/anillos_compromiso/ernesto.png' },
  { id: 'ac-6', name: 'Anillo de Compromiso | Gustavo', category: 'Anillos de compromiso', material: 'Oro Rosa 14K', gemstone: 'Diamantes Laterales en Pavé', price: 'Cotización personalizada', image: '/images/anillos_compromiso/gustavo_1.png' },
  { id: 'ac-7', name: 'Anillo de Compromiso | Gustavo II', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Diamante Central con Halo', price: 'Cotización personalizada', image: '/images/anillos_compromiso/gustavo_2.png' },
  { id: 'ac-8', name: 'Anillo de Compromiso | Juan Pablo', category: 'Anillos de compromiso', material: 'Oro Blanco 18K', gemstone: 'Diamante Natural Certificado', price: 'Cotización personalizada', image: '/images/anillos_compromiso/juan_pablo.png' },
  { id: 'ac-9', name: 'Anillo de Compromiso | Pablo', category: 'Anillos de compromiso', material: 'Oro Amarillo 14K', gemstone: 'Diamante Corte Redondo', price: 'Cotización personalizada', image: '/images/anillos_compromiso/pablo.png' },
  { id: 'ac-10', name: 'Anillo de Compromiso | Ricardo', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Trilogía de Diamantes', price: 'Cotización personalizada', image: '/images/anillos_compromiso/ricardo.png' },
  { id: 'ac-11', name: 'Anillo de Compromiso | Ricky', category: 'Anillos de compromiso', material: 'Oro Rosa 14K', gemstone: 'Diamante Corte Oval', price: 'Cotización personalizada', image: '/images/anillos_compromiso/ricky.png' },
  { id: 'ac-12', name: 'Anillo de Compromiso | Roberto', category: 'Anillos de compromiso', material: 'Oro Blanco 18K', gemstone: 'Diamante Solitario 6 Uñas', price: 'Cotización personalizada', image: '/images/anillos_compromiso/roberto.png' },
  
  // 12 Colecciones Oficiales de Churumbelas (jacquelinetapiajoyeria.com/product-category/churumbelas/)
  { id: 'ch-1', name: 'Churumbela | Laura', category: 'Churumbelas', material: 'Oro 14K', gemstone: 'Diamantes Naturales', price: 'Cotización personalizada', image: '/images/churumbelas/laura.png' },
  { id: 'ch-2', name: 'Churumbela | Sofia', category: 'Churumbelas', material: 'Oro 14K', gemstone: 'Diamantes en Canal', price: 'Cotización personalizada', image: '/images/churumbelas/sofia.png' },
  { id: 'ch-3', name: 'Churumbela | V', category: 'Churumbelas', material: 'Oro 14K', gemstone: 'Diamantes Diseño Chevron V', price: 'Cotización personalizada', image: '/images/churumbelas/v.png' },
  { id: 'ch-4', name: 'Eternity | Alejandra', category: 'Churumbelas', material: 'Oro Blanco 14K', gemstone: 'Diamantes Corte Completo', price: 'Cotización personalizada', image: '/images/churumbelas/alejandra.png' },
  { id: 'ch-5', name: 'Eternity | Mariajo', category: 'Churumbelas', material: 'Oro Blanco 14K', gemstone: 'Diamantes Naturales', price: 'Cotización personalizada', image: '/images/churumbelas/mariajo.png' },
  { id: 'ch-6', name: 'Eternity | Paco', category: 'Churumbelas', material: 'Oro de 14K', gemstone: 'Diamantes de 2.3 mm', price: 'Cotización personalizada', image: '/images/churumbelas/paco.png' },
  { id: 'ch-7', name: 'Media Churumbela | Alejandra', category: 'Churumbelas', material: 'Oro 14K', gemstone: 'Moissanitas / Diamantes', price: 'Cotización personalizada', image: '/images/churumbelas/media_alejandra.png' },
  { id: 'ch-8', name: 'Media Churumbela | Alejandro', category: 'Churumbelas', material: 'Oro Blanco 14K', gemstone: 'Diamantes en Bisel', price: 'Cotización personalizada', image: '/images/churumbelas/media_alejandro.png' },
  { id: 'ch-9', name: 'Media Churumbela | Armando', category: 'Churumbelas', material: 'Oro 14K', gemstone: 'Zafiro y Moissanitas', price: 'Cotización personalizada', image: '/images/churumbelas/media_armando.png' },
  { id: 'ch-10', name: 'Media Churumbela | Aurora', category: 'Churumbelas', material: 'Oro Blanco 14K', gemstone: 'Zafiro Azul y Diamantes', price: 'Cotización personalizada', image: '/images/churumbelas/media_aurora.png' },
  { id: 'ch-11', name: 'Media Churumbela | Bere', category: 'Churumbelas', material: 'Oro 14K', gemstone: 'Diamantes Corte Brillante', price: 'Cotización personalizada', image: '/images/churumbelas/media_bere.png' },
  { id: 'ch-12', name: 'Media Churumbela | Blanca', category: 'Churumbelas', material: 'Oro 14K', gemstone: 'Zafiros de Colores', price: 'Cotización personalizada', image: '/images/churumbelas/media_blanca.png' },
  
  // 10 Colecciones Oficiales Nupciales (jacquelinetapiajoyeria.com/product-category/nupciales/)
  { id: 'nup-1', name: 'Argolla + Churumbela | Mateo', category: 'Nupciales', material: 'Oro 14K Blanco y Rosa', gemstone: 'Diamantes Naturales', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/mateo.png' },
  { id: 'nup-2', name: 'Argolla con Eternity | Tello', category: 'Nupciales', material: 'Oro 14K Amarillo y Blanco', gemstone: 'Diamantes en Eternity', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/tello.png' },
  { id: 'nup-3', name: 'Conjunto Argollas | Monse', category: 'Nupciales', material: 'Oro 14K Blanco y Rosa', gemstone: 'Diamantes Certificados', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/monse.png' },
  { id: 'nup-4', name: 'Eternity + Anillo | Claudia', category: 'Nupciales', material: 'Oro Blanco 14K', gemstone: 'Solitario con Diamantes en Eternity', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/claudia.png' },
  { id: 'nup-5', name: 'Eternity + Anillo | Jaime', category: 'Nupciales', material: 'Oro Amarillo 14K', gemstone: 'Solitario y Churumbela con Diamantes', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/jaime.png' },
  { id: 'nup-6', name: 'Eternity + Argolla | Alex', category: 'Nupciales', material: 'Oro Blanco 14K', gemstone: 'Media Caña y Diamantes', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/alex.png' },
  { id: 'nup-7', name: 'Eternity + Argolla | Brenda', category: 'Nupciales', material: 'Oro Blanco 14K', gemstone: 'Argolla Plana y Diamantes', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/brenda.png' },
  { id: 'nup-8', name: 'Eternity + Argolla | Mariajo', category: 'Nupciales', material: 'Oro Blanco 14K', gemstone: 'Media Caña y Eternity Completa', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/mariajo.png' },
  { id: 'nup-9', name: 'Eternity + Argolla | Rodrigo', category: 'Nupciales', material: 'Oro Blanco y Rosa 14K', gemstone: 'Argolla y Churumbela con Diamantes', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/rodrigo.png' },
  { id: 'nup-10', name: 'Eternity + Argolla | Silvia', category: 'Nupciales', material: 'Oro Blanco 14K', gemstone: 'Argolla Plana con Diamantes', price: 'Cotización personalizada', image: '/images/nupciales_coleccion/silvia.png' },
  
  // 12 Colecciones Oficiales de Anillos (jacquelinetapiajoyeria.com/product-category/anillos/)
  { id: 'an-1', name: 'Anillo | Carlos', category: 'Anillos', material: 'Oro 14K', gemstone: 'Esmeralda Natural', price: 'Cotización personalizada', image: '/images/anillos_coleccion/carlos.png' },
  { id: 'an-2', name: 'Anillo | Colección', category: 'Anillos', material: 'Oro 14K', gemstone: 'Diseño Abeja con Diamantes', price: 'Cotización personalizada', image: '/images/anillos_coleccion/coleccion.png' },
  { id: 'an-3', name: 'Anillo | Gustavo', category: 'Anillos', material: 'Oro Rosa 14K', gemstone: 'Diamantes Naturales', price: 'Cotización personalizada', image: '/images/anillos_coleccion/gustavo.png' },
  { id: 'an-4', name: 'Anillo | Paty', category: 'Anillos', material: 'Oro 14K', gemstone: 'Zafiro Oval y Diamantes', price: 'Cotización personalizada', image: '/images/anillos_coleccion/paty.png' },
  { id: 'an-5', name: 'Anillo | Rodolfo', category: 'Anillos', material: 'Oro 14K', gemstone: 'Zafiro y Diamantes', price: 'Cotización personalizada', image: '/images/anillos_coleccion/rodolfo.png' },
  { id: 'an-6', name: 'Anillo | Silvia', category: 'Anillos', material: 'Oro 14K', gemstone: 'Perla Natural y Diamantes', price: 'Cotización personalizada', image: '/images/anillos_coleccion/silvia.png' },
  { id: 'an-7', name: 'Anillo Apatita | Jaquelín', category: 'Anillos', material: 'Oro 14K', gemstone: 'Apatita Corte Princess', price: 'Cotización personalizada', image: '/images/anillos_coleccion/jaquelin.png' },
  { id: 'an-8', name: 'Anillo con Diamantes | Pablo', category: 'Anillos', material: 'Oro Blanco 14K', gemstone: 'Diamantes Corte Brillante', price: 'Cotización personalizada', image: '/images/anillos_coleccion/pablo.png' },
  { id: 'an-9', name: 'Anillo de Compromiso | David', category: 'Anillos', material: 'Oro Amarillo 14K', gemstone: 'Esmeralda Natural', price: 'Cotización personalizada', image: '/images/anillos_coleccion/david.png' },
  { id: 'an-10', name: 'Anillo Esmeralda | Laura', category: 'Anillos', material: 'Oro 14K', gemstone: 'Esmeralda y Diamantes Laterales', price: 'Cotización personalizada', image: '/images/anillos_coleccion/laura.png' },
  { id: 'an-11', name: 'Anillo Esmeralda | Lore', category: 'Anillos', material: 'Oro 14K', gemstone: 'Esmeralda Natural Certificada', price: 'Cotización personalizada', image: '/images/anillos_coleccion/lore.png' },
  { id: 'an-12', name: 'Anillo Esmeralda | Samantha', category: 'Anillos', material: 'Oro 14K', gemstone: 'Esmeralda y Halo de Diamantes', price: 'Cotización personalizada', image: '/images/anillos_coleccion/samantha.png' },
  
  // 8 Colecciones Oficiales de Argollas (jacquelinetapiajoyeria.com/product-category/argollas/)
  { id: 'arg-1', name: 'Argolla | Fernando', category: 'Argollas', material: 'Oro 14K Amarillo', gemstone: 'Diseño Plano Confort', price: 'Cotización personalizada', image: '/images/argollas_coleccion/fernando.png' },
  { id: 'arg-2', name: 'Argolla | Juan Pablo', category: 'Argollas', material: 'Oro 14K Amarillo', gemstone: 'Diseño Media Caña Clásico', price: 'Cotización personalizada', image: '/images/argollas_coleccion/juan_pablo.png' },
  { id: 'arg-3', name: 'Argolla | Mateo', category: 'Argollas', material: 'Oro 14K Blanco y Rosa', gemstone: 'Acabado Mate Cepillado', price: 'Cotización personalizada', image: '/images/argollas_coleccion/mateo.png' },
  { id: 'arg-4', name: 'Argolla | Monse', category: 'Argollas', material: 'Oro 14K', gemstone: 'Grabado Personalizado', price: 'Cotización personalizada', image: '/images/argollas_coleccion/monse.png' },
  { id: 'arg-5', name: 'Argolla | Olivia', category: 'Argollas', material: 'Oro 14K Blanco', gemstone: 'Diamantes Naturales en Pavé', price: 'Cotización personalizada', image: '/images/argollas_coleccion/olivia.png' },
  { id: 'arg-6', name: 'Argolla | Roberto', category: 'Argollas', material: 'Oro 14K Blanco', gemstone: 'Diseño Media Caña Satinado', price: 'Cotización personalizada', image: '/images/argollas_coleccion/roberto.png' },
  { id: 'arg-7', name: 'Argolla | Tello', category: 'Argollas', material: 'Oro 14K Amarillo', gemstone: 'Diamante Central Incrustado', price: 'Cotización personalizada', image: '/images/argollas_coleccion/tello.png' },
  { id: 'arg-8', name: 'Argolla con Diamantes | Sofia', category: 'Argollas', material: 'Oro 14K Blanco', gemstone: 'Diamantes Corte Brillante', price: 'Cotización personalizada', image: '/images/argollas_coleccion/sofia.png' },
  
  // 11 Colecciones Oficiales de Dijes (jacquelinetapiajoyeria.com/product-category/dijes/)
  { id: 'dj-1', name: 'Dije | Ana', category: 'Dijes', material: 'Oro 14K Amarillo', gemstone: 'Rubí Natural y Diamantes', price: 'Cotización personalizada', image: '/images/dijes_coleccion/ana.png' },
  { id: 'dj-2', name: 'Dije | Gilberto', category: 'Dijes', material: 'Oro Blanco 14K', gemstone: 'Zafiro Natural', price: 'Cotización personalizada', image: '/images/dijes_coleccion/gilberto.png' },
  { id: 'dj-3', name: 'Dije | Julieta', category: 'Dijes', material: 'Oro Blanco 14K', gemstone: 'Zafiros Azules en Gradiente', price: 'Cotización personalizada', image: '/images/dijes_coleccion/julieta.png' },
  { id: 'dj-4', name: 'Dije | Mariajo', category: 'Dijes', material: 'Oro Blanco 14K', gemstone: 'Esmeralda Natural y Halo de Diamantes', price: 'Cotización personalizada', image: '/images/dijes_coleccion/mariajo.png' },
  { id: 'dj-5', name: 'Dije | Marilé', category: 'Dijes', material: 'Oro 14K Amarillo', gemstone: 'Diseño Orgánico con Diamantes', price: 'Cotización personalizada', image: '/images/dijes_coleccion/marile.png' },
  { id: 'dj-6', name: 'Dije | Marlen', category: 'Dijes', material: 'Oro Blanco 14K', gemstone: 'Diamante Solitario', price: 'Cotización personalizada', image: '/images/dijes_coleccion/marlen.png' },
  { id: 'dj-7', name: 'Dije | Marta', category: 'Dijes', material: 'Oro 14K Amarillo', gemstone: 'Zafiro Natural', price: 'Cotización personalizada', image: '/images/dijes_coleccion/marta.png' },
  { id: 'dj-8', name: 'Dije | Paola', category: 'Dijes', material: 'Oro 14K', gemstone: 'Zafiros y Diamantes en Racimo', price: 'Cotización personalizada', image: '/images/dijes_coleccion/paola.png' },
  { id: 'dj-9', name: 'Dije | Paulina', category: 'Dijes', material: 'Oro Blanco 14K', gemstone: 'Zafiro Oval y Diamantes', price: 'Cotización personalizada', image: '/images/dijes_coleccion/paulina.png' },
  { id: 'dj-10', name: 'Dije | Roger', category: 'Dijes', material: 'Oro Blanco 14K', gemstone: 'Zafiro y Diamantes', price: 'Cotización personalizada', image: '/images/dijes_coleccion/roger.png' },
  { id: 'dj-11', name: 'Dije Cruz | Victor', category: 'Dijes', material: 'Oro Blanco 14K', gemstone: 'Cruz de Diamantes Naturales', price: 'Cotización personalizada', image: '/images/dijes_coleccion/victor.png' },
  
  // 15 Colecciones Oficiales de Broqueles (jacquelinetapiajoyeria.com/product-category/broqueles/)
  { id: 'br-1', name: 'Aretes | Maru', category: 'Broqueles', material: 'Oro 14K Amarillo', gemstone: 'Perlas Cultivadas y Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/maru.png' },
  { id: 'br-2', name: 'Broquel | Alma', category: 'Broqueles', material: 'Oro 14K Amarillo', gemstone: 'Diseño Floral con Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/alma.png' },
  { id: 'br-3', name: 'Broquel | César', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Esmeralda Natural Corte Oval', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/cesar.png' },
  { id: 'br-4', name: 'Broquel | Jaime', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Zafiro Natural y Halo de Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/jaime.png' },
  { id: 'br-5', name: 'Broquel | Laura', category: 'Broqueles', material: 'Oro 14K Rosa', gemstone: 'Diamantes Naturales', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/laura.png' },
  { id: 'br-6', name: 'Broquel | Mariajo (Zafiro)', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Zafiro Natural y Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/mariajo-zafiro.png' },
  { id: 'br-7', name: 'Broquel | Mariajo (Diamante)', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Diamante Natural Solitario y Halo', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/mariajo-diamante.png' },
  { id: 'br-8', name: 'Broquel | Mariajo (Esmeralda)', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Esmeralda Natural y Halo de Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/mariajo-esmeralda.png' },
  { id: 'br-9', name: 'Broquel | Marta', category: 'Broqueles', material: 'Oro 14K Rosa', gemstone: 'Morganita Natural y Halo de Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/marta.png' },
  { id: 'br-10', name: 'Broquel | Mony', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Diamantes Pavé', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/mony.png' },
  { id: 'br-11', name: 'Broquel | Ricardo', category: 'Broqueles', material: 'Oro 14K Amarillo', gemstone: 'Zafiro Central y Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/ricardo.png' },
  { id: 'br-12', name: 'Broquel | Roger', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Zafiros Azules y Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/roger.png' },
  { id: 'br-13', name: 'Broquel 2 en 1 | Ana', category: 'Broqueles', material: 'Oro 14K Amarillo', gemstone: 'Diseño Desmontable con Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/ana-2en1.png' },
  { id: 'br-14', name: 'Broquel | Sofi', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Diamantes Naturales', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/sofi.png' },
  { id: 'br-15', name: 'Huggie | Sofi', category: 'Broqueles', material: 'Oro 14K Amarillo', gemstone: 'Arracada / Huggie con Diamantes', price: 'Cotización personalizada', image: '/images/broqueles_coleccion/huggie-sofi.png' },
  
  // 4 Colecciones Oficiales de Especiales (jacquelinetapiajoyeria.com/product-category/especiales/)
  { id: 'esp-1', name: 'Anillo | Aguamarina', category: 'Especiales', material: 'Oro Blanco 14K', gemstone: 'Gema Aguamarina Natural y Diamantes', price: 'Cotización personalizada', image: '/images/especiales_coleccion/aguamarina.png' },
  { id: 'esp-2', name: 'Anillo | Colección (Abeja)', category: 'Especiales', material: 'Oro 14K Amarillo', gemstone: 'Diseño Escultórico de Abeja con Gemas', price: 'Cotización personalizada', image: '/images/especiales_coleccion/abeja.png' },
  { id: 'esp-3', name: 'Anillo | Silvia', category: 'Especiales', material: 'Oro 14K Amarillo', gemstone: 'Perla de Cultivo y Acentos de Diamantes', price: 'Cotización personalizada', image: '/images/especiales_coleccion/silvia.png' },
  { id: 'esp-4', name: 'Anillo Morganitas | Lili', category: 'Especiales', material: 'Oro Rosa 14K', gemstone: 'Morganitas Naturales y Pavé de Diamantes', price: 'Cotización personalizada', image: '/images/especiales_coleccion/lili.png' },
  
  // 5 Colecciones Oficiales de Mancuernillas (jacquelinetapiajoyeria.com/product-category/mancuernillas/)
  { id: 'man-1', name: 'Mancuernillas | Ana y Paco', category: 'Mancuernillas', material: 'Plata Ley .925 / Oro', gemstone: 'Grabado dactilar de alta precisión', price: 'Cotización personalizada', image: '/images/mancuernillas_coleccion/ana-y-paco.png' },
  { id: 'man-2', name: 'Mancuernillas | Carmina', category: 'Mancuernillas', material: 'Plata Ley .925 / Oro', gemstone: 'Diseño Hexagonal Geométrico', price: 'Cotización personalizada', image: '/images/mancuernillas_coleccion/carmina.png' },
  { id: 'man-3', name: 'Mancuernillas | Fernando', category: 'Mancuernillas', material: 'Plata Ley .925 / Oro', gemstone: 'Diseño Rectangular Clásico Satinado', price: 'Cotización personalizada', image: '/images/mancuernillas_coleccion/fernando.png' },
  { id: 'man-4', name: 'Mancuernillas | Mariana', category: 'Mancuernillas', material: 'Plata Ley .925 / Oro', gemstone: 'Iniciales Caladas Personalizadas', price: 'Cotización personalizada', image: '/images/mancuernillas_coleccion/mariana.png' },
  { id: 'man-5', name: 'Mancuernillas Realse | Gilberto', category: 'Mancuernillas', material: 'Plata Ley .925 / Oro', gemstone: 'Monograma en Realce y Contraste', price: 'Cotización personalizada', image: '/images/mancuernillas_coleccion/gilberto.png' }
];

// The 9 official categories with official photography
const defaultCategoryDefs = [
  { name: 'Anillos de compromiso', query: 'Anillos de compromiso', image: '/images/anillo_compromiso.png' },
  { name: 'Churumbelas', query: 'Churumbelas', image: '/images/churumbela.png' },
  { name: 'Nupciales', query: 'Nupciales', image: '/images/nupciales.png' },
  { name: 'Anillos', query: 'Anillos', image: '/images/anillos.png' },
  { name: 'Argollas', query: 'Argollas', image: '/images/argollas.png' },
  { name: 'Dijes', query: 'Dijes', image: '/images/dijes.png' },
  { name: 'Broqueles', query: 'Broqueles', image: '/images/broqueles.png' },
  { name: 'Especiales', query: 'Especiales', image: '/images/especiales.png' },
  { name: 'Mancuernillas', query: 'Mancuernillas', image: '/images/mancuernillas.png' }
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'Todos';
  const [filter, setFilter] = useState(initialCategory);
  const [products, setProducts] = useState(defaultCatalog);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Todos',
    'Anillos de compromiso',
    'Churumbelas',
    'Nupciales',
    'Anillos',
    'Argollas',
    'Dijes',
    'Broqueles',
    'Especiales',
    'Mancuernillas'
  ];

  // Try to load any admin added products from DB if available
  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/public/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map(item => ({
              id: item.id,
              name: item.name,
              category: item.category,
              material: item.material,
              gemstone: item.gemstone,
              price: item.priceBase ? `$${parseFloat(item.priceBase).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN` : null,
              image: item.imageUrl || '/images/ring.png'
            }));
            // Combine with default catalog ensuring no ID collisions
            setProducts([...defaultCatalog, ...formatted]);
          }
        }
      } catch (err) {
        // Fallback silently to client catalog
      }
    };
    fetchApiProducts();
  }, []);

  // Sync category filter when URL search params change
  useEffect(() => {
    const cat = searchParams.get('categoria');
    setFilter(cat || 'Todos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const handleFilterChange = (cat) => {
    setFilter(cat);
    if (cat === 'Todos') {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: cat });
    }
  };

  const filteredProducts = filter === 'Todos'
    ? products
    : products.filter(p => {
        const pCat = (p.category || '').toLowerCase().trim();
        const fCat = filter.toLowerCase().trim();
        return pCat === fCat;
      });

  return (
    <div className="catalog-page">
      <Navbar />

      <main className="catalog-content container">
        <div className="catalog-header">
          <h1 className="section-title">
            {filter === 'Todos' ? 'Catálogo' : (filter.charAt(0).toUpperCase() + filter.slice(1))}
          </h1>
        </div>

        {/* View 1: When user enters General Catalog, show the 9 official Categories */}
        {filter === 'Todos' ? (
          <div className="jt-catalog-categories-view">
            <div className="jt-category-nine-grid">
              {defaultCategoryDefs.map((cat, idx) => (
                <Link 
                  key={idx} 
                  to={`/catalog?categoria=${encodeURIComponent(cat.query)}`} 
                  className="jt-category-tile"
                >
                  <div className="tile-image-wrapper">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                    <div className="tile-hover-overlay">
                      <span className="view-link">Ver Piezas</span>
                    </div>
                  </div>
                  <div className="tile-meta">
                    <h3 className="tile-name">{cat.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* View 2: When user clicks on a Category, show its official products & toolbar */
          <>
            <div className="catalog-toolbar">
              <span className="catalog-results-text">
                Mostrando 1–{filteredProducts.length} de {filteredProducts.length} resultados
              </span>

              <div className="catalog-sort-wrapper">
                <select className="catalog-sort-select" defaultValue="default">
                  <option value="default">Orden predeterminado</option>
                  <option value="popularity">Ordenar por popularidad</option>
                  <option value="rating">Ordenar por calificación media</option>
                  <option value="date">Ordenar por las últimas</option>
                  <option value="price-asc">Ordenar por precio: bajo a alto</option>
                  <option value="price-desc">Ordenar por precio: alto a bajo</option>
                </select>
              </div>
            </div>

            <div className="catalog-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="catalog-card">
                  <div className="catalog-image-wrapper">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="catalog-overlay">
                      <Link to="/order" className="btn-premium filled small">Personalizar Pieza</Link>
                    </div>
                  </div>
                  <div className="catalog-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    {(product.material || product.gemstone) && (
                      <p className="product-materials">
                        {product.material} {product.gemstone && `• ${product.gemstone}`}
                      </p>
                    )}
                    {product.price && (
                      <p className="product-price">{product.price}</p>
                    )}
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="catalog-empty-state">
                  <h3>No se encontraron piezas en "{filter}"</h3>
                  <p>Podemos diseñar y fabricar tu pieza exclusiva totalmente a medida.</p>
                  <Link to="/order" className="btn-premium filled" style={{ marginTop: '1.5rem' }}>
                    Solicitar Diseño Personalizado
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
