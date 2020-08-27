import { Component } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'krasoid';
  clients = [];
  lessons = [];

  constructor(protected dbService: DbService) {
    // clients
    dbService.clients.orderByChild('name').on('value', (c) => {
      const clients = c.val();
      this.clients = Object.keys(clients).map((ck) => ({
        key: ck,
        ...clients[ck],
      }));
    });
    //
    dbService.lessons.orderByChild('date').on('value', (l) => {
      const lessons = l.val();
      dbService.lessonAttendees
        .orderByKey()
        .equalTo(l.key)
        .once('value', (las) => {
          const attendees = las.val();
          console.log(las);
          this.lessons = Object.keys(lessons).map((lk) => ({
            key: lk,
            ...lessons[lk],
            attendees: attendees,
          }));
          console.log(this.lessons);
        });
    });
  }

  addClient() {
    console.log('adding client');
    this.dbService.clients.push({ name: '', email: '' });
  }

  removeClient(key) {
    console.log('removing client', key);
    this.dbService.clients.child(key).remove();
  }

  updateClient(client, path, value) {
    console.log('updating client', client, path, value);
    this.dbService.clients.child(client.key + '/' + path).set(value);
  }

  addLesson() {
    console.log('adding lesson');
    this.dbService.lessons.push({ name: '', email: '' });
  }

  removeLesson(key) {
    console.log('removing lesson', key);
    this.dbService.lessons.child(key).remove();
  }

  updateLesson(lesson, path, value) {
    console.log('updating lesson', lesson, path, value);
    this.dbService.lessons.child(lesson.key + '/' + path).set(value);
  }

  addAttendee(key) {
    const clientId = prompt('Client id');
    console.log('adding attendee', key, clientId);
    this.dbService.lessonAttendees
      .child(key)
      .child(clientId)
      .update({ attending: true, notes: '' });
  }
}
