import { Injectable } from '@angular/core';
import { CharacterModel } from 'src/app/shared/models/character.model';
import { ComicModel } from 'src/app/shared/models/comic.model';
import { SerieModel } from 'src/app/shared/models/serie.model';
import { ApiGatewayService } from './api-gateway.service';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  constructor(private apiGateway: ApiGatewayService) {}
  /**
   * @returns the last 20 characters by default
   */
  getCharacters() {
    return this.apiGateway.get<CharacterModel[]>('/characters');
  }
  /**
   * @param id an id of a character
   * @returns a specific detail of a character
   */
  getCharacter(id: string) {
    return this.apiGateway.get<CharacterModel>(`/characters/${id}`);
  }
  /**
   * @returns the last 20 comics by default
   */
  getComics() {
    return this.apiGateway.get<ComicModel[]>('/comics');
  }
  /**
   * @param id an id of a character
   * @returns a specific detail of a character
   */
  getComic(id: string) {
    return this.apiGateway.get<ComicModel>(`/comics/${id}`);
  }
  /**
   * @returns the last 20 series by default
   */
  getSeries() {
    return this.apiGateway.get<SerieModel[]>('/series');
  }
  /**
   * @param id an id of a serie
   * @returns a specific detail of a serie
   */
  getSerie(id: string) {
    return this.apiGateway.get<SerieModel>(`/series/${id}`);
  }
}
