class InvalidAmountError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidAmount';
  }
}

export default InvalidAmountError;
