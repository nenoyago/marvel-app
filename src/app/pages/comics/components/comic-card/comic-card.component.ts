import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComicModel } from 'src/app/shared/models/comic.model';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ComicCardComponent implements OnInit {
  @Input() comic: ComicModel | undefined;
  constructor() {}

  ngOnInit(): void {}
}
