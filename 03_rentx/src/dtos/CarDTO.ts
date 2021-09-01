interface Rent {
  period: string;
  price: number;
}

interface Accessory {
  type: string;
  name: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  fuel_type: string;
  thumbnail: string;
  rent: Rent;
  photos: string[];
  accessories: Accessory[];
};
