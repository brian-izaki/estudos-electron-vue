export default class NoteForm {
  id: number;
  createdAt: Date;
  title: string;
  note: string;

  constructor(title = "", note = "", createdAt?: Date, id?: number) {
    this.id = id || 0;
    this.createdAt = createdAt || new Date();
    this.title = title;
    this.note = note;
  }
}
