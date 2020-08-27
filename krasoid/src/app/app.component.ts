import { Component } from '@angular/core';
import { DbService } from './services';

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
      this.lessons = Object.keys(lessons).map((lk) => ({
        key: lk,
        ...lessons[lk],
      }));
      for (let lesson of this.lessons) {
        lesson.attending = [];
        Object.keys(lesson.attendance)
          ?.reverse()
          ?.forEach((key) => {
            this.dbService.attendance
              .child(key)
              .once('value')
              .then((s) => {
                lesson.attending.push(s.val());
                // this.lessons.find((l) => l.key === lesson.key).attendance = [
                //   ...this.lessons.find((l) => l.key === lesson.key).attendance,
                //   s.val(),
                // ];
              });
          });
      }
      console.log(this.lessons);
    });
  }

  addClient() {
    console.log('adding client');
    this.dbService.clients.push({ name: '', email: '' });
  }

  removeClient(key) {
    console.log('removing client', key);
    // only soft delete!
    // this.dbService.clients.child(key).remove();
  }

  updateClient(client, path, value) {
    console.log('updating client', client, path, value);
    this.dbService.clients.child(client.key).child(path).set(value);
  }

  addLesson() {
    console.log('adding lesson');
    this.dbService.lessons.push({ date: '' });
  }

  async removeLesson(key) {
    console.log('removing lesson', key);
    // or use rather count of keys in clients
    if (
      (
        await this.dbService.attendance
          .orderByChild('lesson')
          .startAt(key)
          .once('value')
      ).val()
    ) {
      alert('attendees has to be removed first');
      return;
    }
    this.dbService.lessons.child(key).remove();
  }

  updateLesson(lesson, path, value) {
    console.log('updating lesson', lesson, path, value);
    this.dbService.lessons.child(lesson.key).child(path).set(value);
  }

  async addAttendee(lessonId) {
    const clientId = prompt('Client id');
    console.log('adding attendee', lessonId, clientId);
    // check for existing client
    if (!(await this.dbService.clients.child(clientId).once('value')).val()) {
      alert('client does not exist');
      return;
    }
    // check for existing attendance
    if (
      (
        await this.dbService.attendance
          .orderByChild('lesson_client')
          .startAt(`${lessonId}_${clientId}`)
          .once('value')
      ).val()
    ) {
      alert('already assigned');
      return;
    }
    const attendanceKey = this.dbService.attendance.push({
      lesson_client: `${lessonId}_${clientId}`,
      client: clientId,
      lesson: lessonId,
      notes: '',
    }).key;
    this.dbService.clients
      .child(clientId)
      .child('attendance')
      .child(attendanceKey)
      .set(true);
    this.dbService.lessons
      .child(lessonId)
      .child('attendance')
      .child(attendanceKey)
      .set(true);
  }

  async removeAttendee(lessonId, clientId) {
    console.log('removing attendee', lessonId, clientId);
    // check for existing client
    if (!(await this.dbService.clients.child(clientId).once('value')).val()) {
      alert('client does not exist');
      return;
    }
    // check for existing attendance
    const attendanceKey = Object.keys(
      (
        await this.dbService.attendance
          .orderByChild('lesson_client')
          .startAt(`${lessonId}_${clientId}`)
          .limitToFirst(1)
          .once('value')
      ).val()
    )[0];
    console.log(attendanceKey);
    if (!attendanceKey) {
      alert('attendance does not exist');
      return;
    }
    this.dbService.attendance.child(attendanceKey).remove();
    this.dbService.clients
      .child(clientId)
      .child('attendance')
      .child(attendanceKey)
      .remove();
    this.dbService.lessons
      .child(lessonId)
      .child('attendance')
      .child(attendanceKey)
      .remove();
  }
}
