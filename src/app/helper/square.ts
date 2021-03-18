export class Square {
  private _originX: number;
  private _originY: number;
  private _destinationX: number;
  private _destinationY: number;
  constructor(col: number, line: number) {
    this.setOriginX(col);
    this.setOriginY(line);
    this._destinationX = this.originX + 3;
    this._destinationY = this.originY + 3;
  }

  get originX(): number {
    return this._originX;
  }

  setOriginX(value: number) {
    if (value < 3) {
      this._originX = 0;
    } else if (value >= 3 && value <= 5 ) {
      this._originX = 3;
    } else {
      this._originX = 6;
    }
  }

  get originY(): number {
    return this._originY;
  }

  setOriginY(value: number) {
    this._originY = this.setValue(value);
  }

  setValue(value: number): number {
    if (value < 3) {
      return  0;
    } else if (value > 2 && value <= 5) {
      return 3;
    } else {
      return 6;
    }
  }
  get destinationX(): number {
    return this._destinationX;
  }

  get   destinationY(): number {
    return this._destinationY;
  }


}
