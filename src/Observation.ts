import { ERR_DIV_BY_ZERO, ERR_OBS_DIM, ERR_OBS_DIM_MISMATCH, ERR_OBS_EMPTY, ERR_OBS_ITEM_NOT_FOUND, ERR_RAND_INVALID_MIN_MAX } from './constants';
import { Point } from './Point';

export class Observation extends Point {

  init() {
    this.assertData();
    this.assertDimensions();
  }

  dimensions(): number { // alias
    return this.length();
  }

  assertDimensions(): boolean {
    if (this.dimensions() <= 0) throw new Error(ERR_OBS_DIM);
    return true;
  }

  inc(idx: number, val: number): number {
    const newVal = this.item(idx) + val;
    this.change(idx, newVal);
    return newVal;
  }

  dec(idx: number, val: number): number {
    const newVal = this.item(idx) - val;
    this.change(idx, newVal);
    return newVal;
  }

  change(idx: number, val: number) {
    this.assertIndex(idx);
    this.data[idx] = val;
  }

  add(ov: Observation) {
    for (let i = 0; i < ov.length(); i++) {
      this.inc(i, ov.item(i));
    }
  }
  
  sub(ov: Observation) {
    for (let i = 0; i < ov.length(); i++) {
      this.dec(i, ov.item(i));
    }
  }

  mult(val: number) {
    for (let i = 0; i < this.length(); i++) {
      this.change(i, this.item(i) * val);
    }
  }

  div(val: number) {
    if (val === 0.0) throw new Error(ERR_DIV_BY_ZERO);
    for (let i = 0; i < this.length(); i++) {
      this.change(i, this.item(i) / val);
    }
  }

  /**
   * Calculate variance similar to distance betwen 2 points
   * @param {Observation} o1
   * @returns {number}
   */
  variance(o1: Observation): number {
    let sum = 0.0, diff = 0.0;
    const o2 = this;
    o1.assertDimensions();
    o2.assertDimensions();
    if (o1.dimensions() !== o2.dimensions()) throw new Error(ERR_OBS_DIM_MISMATCH);
    
    for (let i = 0; i < o1.length(); i++) {
      diff = o1.item(i) - o2.item(i);
      sum += Math.pow(Math.abs(diff), 2);
    }

    return sum;
  }

}

export function newObservation(dimensions: number): Observation {
  const data = Array.from({ length: dimensions })
    .map(() => 0.0);
  return new Observation(data);
}

export function randObservation(dimensions: number, min: number = 0.0, max: number = 1.0): Observation {
  if (min === max) throw new Error(ERR_RAND_INVALID_MIN_MAX);
  const data = Array.from({ length: dimensions })
    .map(() => min + (max - min) * Math.random());
  return new Observation(data);
}
