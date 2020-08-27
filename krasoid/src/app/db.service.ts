import * as firebase from 'firebase';

export class DbService {
  public readonly clients: firebase.database.Reference;
  public readonly lessons: firebase.database.Reference;
  public readonly lessonAttendees: firebase.database.Reference;

  protected readonly db: firebase.database.Database;

  constructor() {
    const config = {
      apiKey: 'AIzaSyAXGtOvZrSsSCx1G1u6kDKsDJKU0PtVUwI',
      authDomain: 'krasoid.firebaseapp.com',
      databaseURL: 'https://krasoid.firebaseio.com',
      projectId: 'krasoid',
      storageBucket: 'krasoid.appspot.com',
      messagingSenderId: '57100986758',
      appId: '1:57100986758:web:0a15f9c6f13ccacb336407',
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    this.db = firebase.database();

    // Get reference to tables
    this.clients = this.db.ref().child('clients');
    this.lessons = this.db.ref().child('lessons');
    this.lessonAttendees = this.db.ref().child('lessonAttendees');
  }
}
