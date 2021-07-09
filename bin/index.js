const { Command } = require('commander');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { KMeans, parseCsv } = require('../dist');

main();

async function main() {
  const program = new Command();
  program.version('1.0.0')
    .requiredOption('-f, --file <file>', 'CSV data file')
    .option('-k, --cluster-count <count>', 'K-Means cluster count', 2)
    .option('-i, --iteration-limit <limit>', 'Iteration limit', 10);

  program.parse(process.argv);

  const { file, clusterCount, iterationLimit } = program.opts();
  
  const text = readFileSync(resolve(file)).toString();
  const data = parseCsv(text);
  //console.log('observations', data);
  // TODO: normalize data for target range: [0, 1]

  const k = Number.parseInt(clusterCount);
  const iter = Number.parseInt(iterationLimit);

  const kmeans = new KMeans(k, data);

  // TODO loop
  console.info('observation to cluster mappings');
  let map;
  for (let i = 1; i <= iter; i++) {
    console.info('iteration', i);
    map = kmeans.naiveSearch();
  }

  console.info(JSON.stringify(map, null, ' '));

  //let i = 0;
  //for(let c of kmeans.getClusterList().items()) {
  //  console.info('cluster', i++, 'centre', c.getCentre());
  //}

  // until no more changes are detected
}
