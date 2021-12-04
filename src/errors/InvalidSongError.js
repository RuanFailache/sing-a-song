class InvalidSongError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidSong';
  }
}

export default InvalidSongError;
