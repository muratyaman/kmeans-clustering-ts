import { Cluster } from './Cluster';
import { ClusterList, newClusterList } from './ClusterList';
import { ERR_INVALID_K } from './constants';
import { Observation } from './Observation';
import { newObservationList, ObservationList } from './ObservationList';

export class KMeans {

  protected observationToClusterMap: number[] = [];

  protected clusterList: ClusterList;

  protected observationList: ObservationList;

  constructor(
    protected k: number,
    data: number[][], // each row is an observation/point
    initCentresUsingObservations = false,
  ) {
    if (data.length === 0) throw new Error('no observation data given');

    const dimensions     = data[0].length;
    this.observationList = newObservationList(dimensions, data.map(point => new Observation(point)));
    this.clusterList     = newClusterList(k, dimensions);

    this.resetMappings();

    // by default, centres are random points
    if (initCentresUsingObservations) this.initCentresUsingObservations();

    this.assertK();
  }

  getClusterList(): ClusterList {
    return this.clusterList;
  }

  getObservations(): ObservationList {
    return this.observationList;
  }

  assertK(): boolean {
    if (this.k <= 1) throw new Error(ERR_INVALID_K);
    if (this.observationList.length() <= this.k) throw new Error(ERR_INVALID_K);
    return true;
  }

  initCentresUsingObservations() {
    let i = 0;
    for (let c of this.clusterList.items()) {
      const obs = this.observationList.item(i++);
      c.setCentre(obs);
    }
  }

  resetMappings() {
    const length = this.observationList.length();
    this.observationToClusterMap = Array.from({ length }).map(() => -1);
  }

  naiveSearch(): number[] {
    let clusterIdx = 0, observation: Observation, cluster: Cluster, i = 0;
    
    //const previousMappings = [...this.observationToClusterMap]; // use this to find changes
    this.resetMappings();
    
    i = 0;
    for (let c of this.clusterList.items()) {
      c.reset(); // remove all observations
      //console.info('cluster', i++, 'centre', c.getCentre());
    }

    for (let obsIdx = 0; obsIdx < this.observationList.length(); obsIdx++) {
      observation = this.observationList.item(obsIdx);
      clusterIdx = this.clusterList.findNearestClusterByVarianceFromCentre(observation);
      this.observationToClusterMap[obsIdx] = clusterIdx;
      cluster = this.clusterList.item(clusterIdx);
      cluster.append(observation);
    }

    //console.info('new mappings', this.observationToClusterMap);

    i = 0;
    for (let c of this.clusterList.items()) {
      if (c.length() > 0) {
        c.reCentreByMean();
        //console.info('cluster', i++, 'new centre', c.getCentre());
      }
      // TODO if cluster empty, move one random observation from another cluster
    }

    // detect changes in mappings

    return this.observationToClusterMap;
  }

}
