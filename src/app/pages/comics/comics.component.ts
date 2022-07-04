import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { map, Observable, shareReplay } from 'rxjs';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { ComicModel } from 'src/app/shared/models/comic.model';
import { CountPipe } from 'src/app/shared/pipes/count.pipe';
import { ComicCardComponent } from './components/comic-card/comic-card.component';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ComicCardComponent,
    NgxSkeletonLoaderModule,
    CountPipe,
  ],
})
export class ComicsComponent implements OnInit {
  comics$: Observable<ComicModel[]> | undefined;

  constructor(private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.comics$ = this.marvelService.getComics().pipe(
      map(res => res.results),
      shareReplay(1)
    );
  }
}
