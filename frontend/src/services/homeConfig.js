// Initial / Default Home Page Configuration for Jacqueline Tapia Joyería
export const initialHomeConfig = {
  hero: {
    enabled: true,
    tagline: 'JOYERÍA DE AUTOR · PIEZAS EXCLUSIVAS',
    title: 'Creamos lo extraordinario',
    subtitle: 'Piezas personalizadas y únicas que nacen de tus emociones,\ntu esencia y tus historias.',
    buttonText: 'Ver Catálogo',
    buttonLink: '/catalog',
    secondaryButtonText: 'Diseño a Medida',
    secondaryButtonLink: '/order',
    backgroundImage: '/images/hero.png'
  },
  brandPresentation: {
    enabled: true,
    tagline: 'FILOSOFÍA DE AUTOR',
    title: 'Piezas personalizadas',
    quote: 'Mi pasión es plasmar en una pieza las historias de amor más bellas',
    author: 'Jacqueline Tapia — Directora Creativa',
    text: 'Desde la elección de cada gema hasta el último detalle de su elaboración, creamos piezas que atesoran emociones, recuerdos y momentos para toda la vida.',
    buttonText: 'Conoce más sobre Jacqueline Tapia',
    buttonLink: '/acerca-de',
    image: '/images/editorial_order.png'
  },
  categories: {
    enabled: true,
    tagline: 'EXPLORA NUESTRA COLECCIÓN',
    title: 'Categorías de Joyería',
    description: 'Selecciona una categoría para descubrir nuestras creaciones o inspirar tu propia pieza personalizada.'
  },
  fineJewelry: {
    enabled: true,
    tagline: 'SELECCIÓN EXCLUSIVA',
    title: 'Joyería Fina',
    subtitle: '¡Crea una pieza única!',
    description: 'Amplia selección de gemas naturales preciosas y semipreciosas con los más rigurosos estándares éticos y de pureza ¡Disponibles para ti! Diamantes, zafiros, esmeraldas, rubíes y más.',
    buttonText: 'Elige tu piedra',
    buttonLink: '/#gemas',
    image: '/images/editorial_login.png'
  },
  favorites: {
    enabled: true,
    tagline: '',
    title: 'Favoritos del mes',
    description: 'Las creaciones más solicitadas y admiradas por nuestros clientes este mes.'
  },
  personalization: {
    enabled: true,
    tagline: 'ALTA JOYERÍA A MEDIDA',
    title: 'Un regalo atemporal que perdurará por siempre',
    subtitle: 'Todas nuestras piezas son personalizadas',
    description: 'Participa en cada etapa de la creación: desde el boceto inicial y la elección de gemas hasta el modelo 3D.',
    buttonText: 'Contáctanos',
    buttonLink: '/#contacto',
    image: '/images/necklace.png'
  },
  designPhilosophy: {
    enabled: true,
    tagline: 'NUESTRO COMPROMISO',
    title: 'Filosofía de Diseño',
    statement: '',
    features: [
      {
        title: 'Oro 14K',
        description: 'Metales preciosos de procedencia garantizada en oro amarillo, blanco y rosa.'
      },
      {
        title: 'Gemas Certificadas',
        description: 'Diamantes y piedras preciosas seleccionadas con certificación de autenticidad.'
      },
      {
        title: 'Artesanía Mexicana',
        description: 'Manos artesanas que combinan técnicas tradicionales de orfebrería con modelado 3D.'
      }
    ]
  },
  stories: {
    enabled: true,
    tagline: 'TESTIMONIOS',
    title: '¡Gracias!',
    subtitle: 'Por dejarnos ser parte de tu historia de amor',
    buttonText: 'Conoce más',
    buttonLink: '/#historias'
  },
  footer: {
    facebookUrl: 'https://www.facebook.com/jacquelinetapiajoyeria',
    instagramUrl: 'https://www.instagram.com/jacquelinetapiajoyeria',
    tiktokUrl: 'https://www.tiktok.com/@jacquelinetapiajoyeria',
    whatsappNumber: '523338427017',
    whatsappMessage: 'Hola, me gustaría solicitar informes sobre una pieza personalizada de Jacqueline Tapia Joyería',
    copyright: '© 2026 Jacqueline Tapia Joyería. Todos los derechos reservados.'
  }
};

const STORAGE_KEY = 'jt_home_page_cms_config';

export function getHomeConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...initialHomeConfig, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading home config:', e);
  }
  return initialHomeConfig;
}

export function saveHomeConfig(newConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    return true;
  } catch (e) {
    console.error('Error saving home config:', e);
    return false;
  }
}
