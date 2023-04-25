export class DatabaseError extends Error {
  constructor(error) {
    const { code, sqlMessage, sqlState, sql } = error;
    super(`${sqlMessage}, ${code}`);
    const errorMessage = { code, sqlMessage, sqlState, sql };
    this.name = this.constructor.name;
    this.hint = errorMessage;
    console.error(errorMessage);
  }
}
export class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    console.error(message);
  }
}
