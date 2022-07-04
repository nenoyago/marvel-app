import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { map, Observable } from 'rxjs';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { CharacterModel } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, AngularSvgIconModule],
})
export class HomeComponent implements OnInit {
  characters$: Observable<CharacterModel[]> | undefined;

  constructor(private marvelService: MarvelService) {}

  ngOnInit(): void {}
}
