import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../pages/home/home.component').then(mod => mod.HomeComponent),
      },
      {
        path: 'characters',
        loadComponent: () =>
          import('../pages/characters/characters.component').then(
            mod => mod.CharactersComponent
          ),
      },
      {
        path: 'comics',
        loadComponent: () =>
          import('../pages/comics/comics.component').then(
            mod => mod.ComicsComponent
          ),
      },
      {
        path: 'series',
        loadComponent: () =>
          import('../pages/series/series.component').then(
            mod => mod.SeriesComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
