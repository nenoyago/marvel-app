export interface SerieModel {
  id: string;
  title: string;
  description: string;
  modified: string;
  rating: string;
  startYear: number;
  endYear: number;
  thumbnail: {
    extension: string;
    path: string;
  };
}
