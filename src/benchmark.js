import objectHash from 'object-hash';
import murmurHash from './murmur-hash.js';
import sparkHash from './spark-hash.js';
import fastHash from './fast-hash.js';
import claudeMurmur from './claude-murmur.js';

const TEST_ITERATIONS = 10000;

const testCases = {
  'Simple String': 'test string',
  'Number': 12345,
  'Simple Object': { a: 1, b: 2, c: 3 },
  'Nested Object': {
    id: 123,
    name: 'test',
    nested: { a: 1, b: 2, c: [1, 2, 3] },
    array: [1, 2, { x: 'y' }]
  },
  'Large Array': Array(1000).fill(0).map((_, i) => ({ id: i })),
  'Complex Object': {
    id: 'abc123',
    timestamp: Date.now(),
    metadata: {
      user: {
        id: 456,
        preferences: {
          theme: 'dark',
          notifications: true,
          items: Array(50).fill(0).map((_, i) => ({
            id: i,
            enabled: i % 2 === 0
          }))
        }
      },
      system: {
        version: '1.0.0',
        features: Array(20).fill(0).map((_, i) => `feature-${i}`),
        flags: Array(30).fill(0).map((_, i) => ({ flag: `flag-${i}`, value: i % 3 }))
      }
    }
  }
};

function benchmarkHash(name, fn, value) {
  const start = performance.now();
  for (let i = 0; i < TEST_ITERATIONS; i++) {
    fn(value);
  }
  const end = performance.now();
  const timePerOp = (end - start) / TEST_ITERATIONS;
  const opsPerSec = 1000 / timePerOp;

  return {
    timePerOp,
    opsPerSec
  };
}


function formatNumber(num) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  });
}

function runBenchmark() {
  console.log(`Running ${TEST_ITERATIONS.toLocaleString()} iterations per test...\n`);
  console.log('│ Test Case │ Implementation │ Time/Op (ms) │ Ops/Sec │');
  console.log('├───────────┼───────────────┼──────────────┼─────────┤');

  for (const [caseName, value] of Object.entries(testCases)) {
    console.log('Test case:', caseName);
    // Test all implementations
    const implementations = {
      'object-hash': (v) => objectHash.MD5(v),
      'fastHash': fastHash,
      'murmurHash': murmurHash,
      'sparkHash': sparkHash,
      'claudeMurmur': claudeMurmur
    };

    const results = {};
    for (const [implName, impl] of Object.entries(implementations)) {
      results[implName] = benchmarkHash(caseName, impl, value);
    }

    // Print results
    const sortedResults = Object.entries(results).sort((a, b) =>
      a[1].timePerOp - b[1].timePerOp
    );

    // Print fastest first
    const [fastestName, fastestResult] = sortedResults[0];
    console.log(
      `│ ${caseName.padEnd(9)} │ ` +
      `${fastestName.padEnd(12)} │ ${formatNumber(fastestResult.timePerOp).padStart(11)} │ ` +
      `${formatNumber(fastestResult.opsPerSec).padStart(7)} │`
    );

    // Print others relative to fastest
    sortedResults.slice(1).forEach(([implName, result]) => {
      const relative = result.timePerOp / fastestResult.timePerOp;
      console.log(
        `│ ${' '.repeat(9)} │ ` +
        `${implName.padEnd(12)} │ ${formatNumber(result.timePerOp).padStart(11)} │ ` +
        `${formatNumber(result.opsPerSec).padStart(7)} │`
      );
      console.log(`│           │ vs ${fastestName}   │ slower by ${formatNumber(relative)}x │`);
    });
    console.log('├───────────┼───────────────┼──────────────┼─────────┤');
  }

  // Verify hash distribution
  console.log('\nHash Distribution Test (1000 random objects):');
  const hashSets = {
    'fastHash': new Set(),
    'murmurHash': new Set(),
    'sparkHash': new Set(),
    'object-hash': new Set(),
    'claudeMurmur': new Set()
  };

  for (let i = 0; i < 1000; i++) {
    const obj = {
      id: Math.random(),
      data: Array(5).fill(0).map(() => Math.random())
    };
    hashSets['fastHash'].add(fastHash(obj));
    hashSets['murmurHash'].add(murmurHash(obj));
    hashSets['sparkHash'].add(sparkHash(obj));
    hashSets['object-hash'].add(objectHash.MD5(obj));
    hashSets['claudeMurmur'].add(claudeMurmur(obj));
  }

  Object.entries(hashSets).forEach(([name, set]) => {
    console.log(`${name} unique values: ${set.size}/1000`);
  });
}

// Run the benchmark
runBenchmark();
