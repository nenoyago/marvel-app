import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { map, Observable, shareReplay } from 'rxjs';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { SerieModel } from 'src/app/shared/models/serie.model';
import { CountPipe } from 'src/app/shared/pipes/count.pipe';
import { SerieCardComponent } from './components/serie-card/serie-card.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    SerieCardComponent,
    CountPipe,
  ],
})
export class SeriesComponent implements OnInit {
  series$: Observable<SerieModel[]> | undefined;

  constructor(private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.series$ = this.marvelService.getSeries().pipe(
      map(res => res.results),
      shareReplay(1)
    );
  }
}
