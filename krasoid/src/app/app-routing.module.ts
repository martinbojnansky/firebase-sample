import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomePageComponent,
  LessonsPageComponent,
  ClientsPageComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'lessons',
    component: LessonsPageComponent,
  },
  {
    path: 'clients',
    component: ClientsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
