import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.component.html',
  styleUrls: ['./lessons-page.component.scss'],
})
export class LessonsPageComponent implements OnInit {
  selectedDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
