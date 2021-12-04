class NotSongsFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotSongsFound';
  }
}

export default NotSongsFoundError;
