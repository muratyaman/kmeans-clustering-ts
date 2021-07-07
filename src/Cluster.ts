import { ERR_CLU_NO_CENTRE } from './constants';
import { Observation, randObservation } from './Observation';
import { ObservationList } from './ObservationList';

export class Cluster extends ObservationList {

  protected centre?: Observation;
  
  setRandomCentre() {
    this.centre = randObservation(this.dimensions);
  }
  
  setCentre(obs: Observation) {
    this.centre = obs;
  }

  getCentre(): Observation {
    if (this.centre) return this.centre;
    throw new Error(ERR_CLU_NO_CENTRE);
  }

  reCentreByMean(): void {
    //if (this.length() === 0) return; // no data!
    const m = this.mean();
    this.setCentre(m);
  }

  meanVarianceFromCentre() {
    return this.meanVariance(this.getCentre());
  }
}

export function newCluster(dimensions: number): Cluster {
  const c = new Cluster([]);
  c.setDimensions(dimensions);
  c.assertDimensions();
  c.setRandomCentre();
  return c;
}
