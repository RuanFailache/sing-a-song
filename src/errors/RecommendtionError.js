export class NotSongsFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotSongsFound';
  }
}
