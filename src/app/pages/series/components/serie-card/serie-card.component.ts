import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SerieModel } from 'src/app/shared/models/serie.model';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SerieCardComponent {
  @Input() serie: SerieModel | undefined;
}
