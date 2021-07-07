import { ERR_OBS_DIM_MISMATCH, ERR_OBS_LIST_DIM } from './constants';
import { newObservation, Observation } from './Observation';
import { TypedList } from './TypedList';

export class ObservationList extends TypedList<Observation> {

  // all observations must have same dimensions
  protected dimensions: number = 0;

  getDimensions(): number {
    return this.dimensions;
  }
  
  setDimensions(dimensions: number): void {
    this.dimensions = dimensions;
  }

  assertDimensions(): boolean {
    if (this.dimensions <= 0) throw new Error(ERR_OBS_LIST_DIM);
    return true;
  }

  assertObservations(): boolean {
    this.assertDimensions();
    for (const ob of this.data) {
      if (ob.dimensions() !== this.dimensions) throw new Error(ERR_OBS_DIM_MISMATCH);
    }
    return true;
  }

  load(points: number[][]) {
    this.assertDimensions();
    this.data = [];
    for (const point of points) {
      const ob = new Observation(point);
      if (ob.dimensions() !== this.dimensions) throw new Error(ERR_OBS_DIM_MISMATCH);
      this.append(ob);
    }
  }

  mean(): Observation {
    const mean = newObservation(this.dimensions);
    for (const obs of this.data) {
      mean.add(obs);
    }
    mean.div(this.length()); // delay division, better precision
    return mean;
  }

  sumVariance(obs: Observation): number {
    this.assertData();
    let sum = 0.0;
    for (const it of this.data) {
      sum += obs.variance(it);
    }
    return sum;
  }

  meanVariance(obs: Observation): number {
    this.assertData();
    return this.sumVariance(obs) / this.length();
  }

}

export function newObservationList(dimensions: number, data: Observation[] = []): ObservationList {
  const ol = new ObservationList(data); // asserts data and dimensions
  ol.setDimensions(dimensions);
  ol.assertDimensions();
  ol.assertObservations();
  return ol;
}
