import { expect } from 'chai';
import { KMeans } from '../src';

describe('KMeans', () => {

  it('should do naiveSearch as expected', () => {
    const k = 2;
    const data = [
      [0.1, 0.1],
      [0.2, 0.2],
      [0.25, 0.25],
      [0.3, 0.3],
      [0.35, 0.35],
      [0.4, 0.4],
      [0.5, 0.5],
      [0.6, 0.6],
      [0.65, 0.65],
    ];
    const kmeans = new KMeans(k, data);
    expect(kmeans.naiveSearch()).to.deep.eq([]);
  });

});
