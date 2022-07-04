import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { map, Observable, shareReplay } from 'rxjs';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { CharacterModel } from 'src/app/shared/models/character.model';
import { CountPipe } from 'src/app/shared/pipes/count.pipe';
import { CharacterCardComponent } from './components/character-card/character-card.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    NgxSkeletonLoaderModule,
    CountPipe,
  ],
})
export class CharactersComponent implements OnInit {
  characters$: Observable<CharacterModel[]> | undefined;

  constructor(private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.characters$ = this.marvelService.getCharacters().pipe(
      map(res => res.results),
      shareReplay(1)
    );
  }
}
