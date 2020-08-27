export interface Entity {
  key: string;
}

export interface ManyToManyEntity extends Entity {
  ckey: string;
}

export interface Client extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  attendance: Attendance[];
}

export interface Lesson extends Entity {
  date: string;
  startTime: string;
  endTime: string;
}

export interface Attendance extends ManyToManyEntity {
  client: string;
  lesson: string;
  cancelled: boolean;
  notes: string;
}
