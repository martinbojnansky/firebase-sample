import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbService } from './services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './components';
import {
  LessonsPageComponent,
  HomePageComponent,
  ClientsPageComponent,
} from './pages';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LessonsPageComponent,
    ClientsPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
  ],
  providers: [DbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
