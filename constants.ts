
import { Product } from './types';

export const COLORS = {
  primary: '#065F46', 
  accent: '#D97706', 
};

export const CONTACT_INFO = {
  name: "Nashwa",
  phone: "01718952852",
  email: "nobih83@gmail.com",
  address: "Dhaka, Bangladesh",
  facebookUrl: "https://www.facebook.com/damkotochai/"
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Embroidered Saree',
    price: 4500,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510ef676f3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Beautifully handcrafted silk saree with intricate embroidery work, featuring a luxurious finish perfect for weddings and formal events.',
    variations: [
      {
        name: 'Size',
        type: 'text',
        options: [
          { label: 'Standard', priceModifier: 0 },
          { label: 'Plus Size', priceModifier: 500 }
        ]
      },
      {
        name: 'Color',
        type: 'color',
        options: [
          { label: '#800000', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
          { label: '#000080', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
          { label: '#006400', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Gold Plated Jhumka',
    price: 1200,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630019051930-47382db95a28?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Traditional gold-plated jhumka earrings for elegant occasions, featuring delicate craftsmanship and timeless design.',
    variations: [
      {
        name: 'Material',
        type: 'text',
        options: [
          { label: 'Gold Plated', priceModifier: 0 },
          { label: 'Pure Silver', priceModifier: 1800 }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Designer Clutch Bag',
    price: 2500,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Stylish velvet clutch with golden embroidery and a detachable chain strap for versatile styling.',
    variations: [
      {
        name: 'Color',
        type: 'color',
        options: [
          { label: '#000000', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?auto=format&fit=crop&w=800&q=80' },
          { label: '#C0C0C0', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Chiffon Party Wear',
    price: 3800,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Flowy chiffon dress perfect for evening gatherings, featuring a lightweight fabric and a modern silhouette.',
    variations: [
      {
        name: 'Size',
        type: 'text',
        options: [
          { label: 'S', priceModifier: 0 },
          { label: 'M', priceModifier: 0 },
          { label: 'L', priceModifier: 0 },
          { label: 'XL', priceModifier: 200 }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Pearl Necklace Set',
    price: 1800,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant freshwater pearl necklace with matching earrings for a sophisticated look.'
  },
  {
    id: '6',
    name: 'Stiletto Heels',
    price: 3200,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek black stilettos with comfortable cushioning and a timeless point-toe design.',
    variations: [
      {
        name: 'EU Size',
        type: 'text',
        options: [
          { label: '36', priceModifier: 0 },
          { label: '37', priceModifier: 0 },
          { label: '38', priceModifier: 0 },
          { label: '39', priceModifier: 0 },
          { label: '40', priceModifier: 0 }
        ]
      }
    ]
  }
];
