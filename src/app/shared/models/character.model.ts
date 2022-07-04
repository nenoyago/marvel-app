export interface CharacterModel {
  id: number;
  modified: string;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}
