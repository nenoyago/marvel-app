import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CharacterModel } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CharacterCardComponent implements OnInit {
  @Input() character: CharacterModel | undefined;

  constructor() {}

  ngOnInit(): void {}
}
