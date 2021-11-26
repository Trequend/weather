import { BezierCurve } from './bezier-curve.class';
import { Vector2 } from '../vector2.class';

export class BezierCurveVector2 extends BezierCurve<Vector2, Vector2> {
  constructor(states: Array<Vector2>) {
    super(states, {
      multiply: (a, b) => {
        return a.multiply(b);
      },
      add: (a, b) => {
        return a.add(b);
      },
      convertFromIntermediate: (vector) => vector,
      convertToIntermediate: (vector) => vector,
    });
  }
}
