export interface PlantGrowthStage {
  stage: 'Sprout' | 'Sapling' | 'Young Tree' | 'Mature Specimen';
  age: string;
  height: string;
  description: string;
}

export interface BotanicalSpecs {
  scientificName: string;
  family: string;
  hardinessZones: string;
  sunlight: 'Full Sun' | 'Partial Shade' | 'Indirect Bright' | 'Low Light';
  watering: 'Weekly' | 'Bi-weekly' | 'Keep Moist' | 'Drought Tolerant';
  matureHeight: string;
  growthRate: 'Slow' | 'Moderate' | 'Fast';
  airPurification: 'High' | 'Very High' | 'Exceptional';
  petFriendly: boolean;
  bioluminescentGlow?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'Trees' | 'Fruit Trees' | 'Shrubs' | 'Flowering' | 'Bonsai' | 'Exotic';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: {
    text: string;
    color: 'emerald' | 'purple' | 'blue' | 'pink' | 'amber';
  };
  image: string;
  description: string;
  botanicalSpecs: BotanicalSpecs;
  growthStages: PlantGrowthStage[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPot?: 'Ceramic Charcoal' | 'Terra Cotta Moss' | 'Bioluminescent Glaze';
}
