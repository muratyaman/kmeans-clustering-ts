const { readFileSync } = require('fs');
const { resolve } = require('path');
const { KMeans, parseCsv } = require('../dist');

main();

async function main() {
  const [_node, _indexjs, fileName] = process.argv;
  if (!fileName) return console.error('text file is required');
  
  const text = readFileSync(resolve(fileName)).toString();
  const data = parseCsv(text);
  console.log('observations', data);
  // TODO: normalize data for target range: [0, 1]

  const k = 2; // cluster count
  const kmeans = new KMeans(k, data);

  // TODO loop
  console.info('observation to cluster mappings');
  for (let i = 1; i <= 10; i++) {
    console.info('iteration', i);
    const map = kmeans.naiveSearch();
    console.info(map);
  }

  let i = 0;
  for(let c of kmeans.getClusterList().items()) {
    console.info('cluster', i++, 'centre', c.getCentre());
  }

  // until no more changes are detected
}
