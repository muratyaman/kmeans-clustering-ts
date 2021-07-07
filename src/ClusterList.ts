import { Cluster, newCluster } from './Cluster';
import { Observation } from './Observation';
import { TypedList } from './TypedList';

export class ClusterList extends TypedList<Cluster> {

  findNearestClusterByVarianceFromCentre(ob: Observation): number {
    let idx = 0, minVar = -1;

    for (let i = 0; i < this.length(); i++) {
      const cluster = this.item(i);
      const variance = cluster.getCentre().variance(ob);
      if (i === 0) minVar = variance;
      if (variance < minVar) {
        minVar = variance;
        idx = i;
      }
    }

    return idx;
  }

  findNearestClusterByMeanVariance(ob: Observation): number {
    let idx = 0, minMeanVar = -1;

    for (let i = 0; i < this.length(); i++) {
      const cluster = this.item(i);
      const meanVar = cluster.meanVariance(ob);
      if (i === 0) minMeanVar = meanVar;
      if (meanVar < minMeanVar) {
        minMeanVar = meanVar;
        idx = i;
      }
    }

    return idx;
  }

  reCentreAll() {
    for (const c of this.data) {
      c.reCentreByMean();
    }
  }

}

export function newClusterList(k: number, dimensions: number) {
  const data: Cluster[] = Array.from({ length: k })
    .map(() => newCluster(dimensions));
  return new ClusterList(data);
}
