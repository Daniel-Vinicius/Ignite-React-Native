interface Accessory {
  id: string;
  car_id: string;
  type: string;
  name: string;
}

export interface Photo {
  id: string;
  car_id: string;
  photo: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  fuel_type: string;
  thumbnail: string;
  period: string;
  price: number;
  photos?: Photo[];
  accessories?: Accessory[];
};
