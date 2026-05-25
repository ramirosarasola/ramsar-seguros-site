import type { StaticImageData } from 'next/image'
import toyotaImg from '@/assets/marcas/toyota.webp'
import volkswagenImg from '@/assets/marcas/volkswagen.webp'
import fordImg from '@/assets/marcas/ford.webp'
import chevroletImg from '@/assets/marcas/chevrolet.webp'
import renaultImg from '@/assets/marcas/renault.webp'
import peugeotImg from '@/assets/marcas/peugeot.webp'
import fiatImg from '@/assets/marcas/fiat.webp'
import citroenImg from '@/assets/marcas/citroen.webp'
import nissanImg from '@/assets/marcas/nissan.webp'
import hondaImg from '@/assets/marcas/honda.webp'
import suzukiImg from '@/assets/marcas/suzuki.webp'

export type VehiculoMarca = {
  slug: string
  name: string
  description: string
  models: string[]
  img?: StaticImageData
}

export const MARCAS: VehiculoMarca[] = [
  {
    slug: 'toyota',
    name: 'Toyota',
    img: toyotaImg,
    description:
      'Toyota es una de las marcas más vendidas en Argentina, reconocida por su durabilidad y bajo costo de mantenimiento. Sus modelos más asegurados son la Hilux, el Corolla y el RAV4.',
    models: ['Corolla', 'Hilux', 'RAV4', 'Fortuner', 'Yaris', 'Etios', 'Prius', 'SW4', 'Camry', 'Land Cruiser', 'Hiace', 'Innova'],
  },
  {
    slug: 'volkswagen',
    name: 'Volkswagen',
    img: volkswagenImg,
    description:
      'Volkswagen tiene una presencia histórica en el mercado argentino. El Gol, el Polo y el Amarok son referentes en sus segmentos y cuentan con amplia oferta de coberturas.',
    models: ['Gol', 'Polo', 'Golf', 'Vento', 'Virtus', 'T-Cross', 'Taos', 'Tiguan', 'Amarok', 'Passat', 'Saveiro', 'Voyage'],
  },
  {
    slug: 'ford',
    name: 'Ford',
    img: fordImg,
    description:
      'Ford combina tradición y tecnología. La Ranger lidera el segmento de pickups mientras que la EcoSport y el Territory apuestan al mundo SUV con coberturas accesibles.',
    models: ['EcoSport', 'Ranger', 'Ka', 'Focus', 'Fiesta', 'Kuga', 'Territory', 'Mondeo', 'Transit', 'Bronco', 'F-150'],
  },
  {
    slug: 'chevrolet',
    name: 'Chevrolet',
    img: chevroletImg,
    description:
      'Chevrolet es la marca más vendida de Argentina. El Onix domina el mercado de autos compactos y cuenta con opciones de seguro muy competitivas en todas las aseguradoras.',
    models: ['Onix', 'Cruze', 'Tracker', 'S10', 'Spin', 'Montana', 'Agile', 'Prisma', 'Captiva', 'Trailblazer', 'Equinox'],
  },
  {
    slug: 'renault',
    name: 'Renault',
    img: renaultImg,
    description:
      'Renault ofrece una gama diversa para el mercado argentino, desde el Sandero urbano hasta el Oroch pickup. La marca tiene fuerte presencia en el segmento popular.',
    models: ['Sandero', 'Stepway', 'Logan', 'Duster', 'Kangoo', 'Koleos', 'Oroch', 'Symbol', 'Clio', 'Fluence'],
  },
  {
    slug: 'peugeot',
    name: 'Peugeot',
    img: peugeotImg,
    description:
      'Peugeot combina diseño europeo con practicidad. El 208 y el 2008 son sus modelos más populares en Argentina, con buena valorización y costos de seguro accesibles.',
    models: ['208', '308', '408', '3008', '5008', 'Partner', 'Berlingo', '2008', 'Landtrek', 'Expert'],
  },
  {
    slug: 'fiat',
    name: 'Fiat',
    img: fiatImg,
    description:
      'Fiat tiene larga historia en Argentina con fábricas locales. El Cronos, el Argo y la Toro son sus modelos estrella, con buen acceso a repuestos y bajo costo de reparación.',
    models: ['Cronos', 'Argo', 'Toro', 'Uno', 'Palio', 'Strada', '500', 'Mobi', 'Doblò', 'Ducato'],
  },
  {
    slug: 'citroen',
    name: 'Citroën',
    img: citroenImg,
    description:
      'Citroën apuesta al confort y la tecnología. El C3, el C4 y el Berlingo son referentes de la marca en el mercado argentino con buena relación precio-cobertura.',
    models: ['C3', 'C4', 'Berlingo', 'Jumpy', 'C5', 'C3 Aircross', 'C4 Cactus'],
  },
  {
    slug: 'nissan',
    name: 'Nissan',
    img: nissanImg,
    description:
      'Nissan crece en Argentina con modelos como la Frontier y el Kicks. Su pickup es muy valorada en el interior del país por su capacidad de carga y durabilidad.',
    models: ['Frontier', 'Kicks', 'Versa', 'March', 'Note', 'Patrol', 'Murano'],
  },
  {
    slug: 'honda',
    name: 'Honda',
    img: hondaImg,
    description:
      'Honda es sinónimo de confiabilidad. El Civic y el HR-V son los más asegurados de la marca, con excelente valorización en el mercado de usados argentino.',
    models: ['Civic', 'HR-V', 'City', 'CR-V', 'WR-V', 'Accord', 'Jazz'],
  },
  {
    slug: 'jeep',
    name: 'Jeep',
    description:
      'Jeep domina el segmento premium 4x4. El Renegade y el Compass son los más populares en Argentina, con coberturas específicas para vehículos de mayor valor.',
    models: ['Renegade', 'Compass', 'Wrangler', 'Grand Cherokee'],
  },
  {
    slug: 'hyundai',
    name: 'Hyundai',
    description:
      'Hyundai crece con fuerza en Argentina. La Creta y el Tucson lideran el segmento SUV de la marca, con garantías extendidas y buenas condiciones de cobertura.',
    models: ['Creta', 'Tucson', 'Santa Fe', 'i30', 'HB20', 'Ioniq'],
  },
  {
    slug: 'kia',
    name: 'Kia',
    description:
      'Kia se consolida en Argentina con diseño moderno y garantías de fábrica. El Sportage y el Cerato tienen muy buena aceptación entre las aseguradoras.',
    models: ['Sportage', 'Sorento', 'Cerato', 'Picanto', 'Stonic'],
  },
  {
    slug: 'dodge',
    name: 'Dodge',
    description:
      'Dodge atiende el segmento premium y de pickups en Argentina. El Journey y la RAM 1500 cuentan con coberturas especializadas para vehículos de alta gama.',
    models: ['Journey', 'RAM 1500', 'Durango'],
  },
  {
    slug: 'suzuki',
    name: 'Suzuki',
    img: suzukiImg,
    description:
      'Suzuki apuesta a la eficiencia y el off-road accesible. El Vitara y el Jimny son los modelos más pedidos en Argentina, con buen posicionamiento entre aseguradoras.',
    models: ['Vitara', 'Swift', 'Jimny', 'S-Cross'],
  },
]

export const ALL_MARCA_SLUGS = MARCAS.map((m) => m.slug)

export function getMarcaBySlug(slug: string): VehiculoMarca | undefined {
  return MARCAS.find((m) => m.slug === slug)
}

export function modeloToSlug(modelo: string): string {
  return modelo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
