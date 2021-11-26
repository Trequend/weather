export class Vector2 {
  constructor(public readonly x: number, public readonly y: number) {}

  public multiply(value: number) {
    return new Vector2(this.x * value, this.y * value);
  }

  public add(value: Vector2) {
    return new Vector2(this.x + value.x, this.y + value.y);
  }
}
