export interface ComicModel {
  id: string;
  modified: string;
  title: string;
  description: string;
  diamondCode: string;
  issueNumber: number;
  dates: DateModel[];
  prices: PriceModel[];
  images: ImageModel[];
  thumbnail: {
    extension: string;
    path: string;
  };
}

interface PriceModel {
  type: string;
  price: number;
}

interface ImageModel {
  extension: string;
  path: string;
}

interface DateModel {
  type: 'onsaleDate' | 'focDate';
  date: string;
}
