export interface MenuItem {
  name: string;
  price: string;
  desc: string;
  img: string;
  popular: boolean;
}

export type MenuData = Record<string, MenuItem[]>;

export interface DayHours {
  open: string;
  close: string;
  open2: string;
  close2: string;
}

export type HoursData = Record<string, DayHours>;

export interface RestaurantSettings {
  name: string;
  tagline: string;
  since: string;
  rating: number;
  reviews: number;
  price: string;
  address: string;
  phone: string;
  phoneHref: string;
  maps: string;
  google: string;
  facebook: string;
  instagram: string;
  website: string;
}

export interface RestaurantData {
  menu: MenuData;
  hours: HoursData;
  photos: string[];
  settings: RestaurantSettings;
}
