class AddConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AddConflict';
  }
}

export default AddConflictError;
