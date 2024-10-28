# Universal Hash Benchmark

Compares different hashing algorithms for performance and hash distribution.

Claude came up with an optimized verion of Murmurhash, but it doesn't sort the
keys before hashing which can lead to different hash values for the same object.

It's a toss-up between fastHash and murmurHash for performance.

## Results
node src/test.js
```
n1 { id: 1, name: 'test', nested: { a: 1, b: 2, c: [ 1, 2, 3 ] } }
n2 { nested: { b: 2, c: [ 1, 2, 3 ], a: 1 }, name: 'test', id: 1 }
claudeMurmur: No Pass
objectHash: Pass
murmurHash: Pass
sparkHash: Pass
fastHash: Pass
JSON.stringify: No Pass

These should not hash to the same
obj1 { a: undefined }
obj2 {}
claudeMurmur: Pass
objectHash: Pass
murmurHash: Pass
sparkHash: Pass
fastHash: Pass
JSON.stringify: No Pass
Algos that passed:  [ 'objectHash', 'murmurHash', 'sparkHash', 'fastHash' ]
```

node src/benchmark.js
```
Running 10,000 iterations per test...

│ Test Case │ Implementation │ Time/Op (ms) │ Ops/Sec │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Simple String
│ Simple String │ fastHash     │       0.000 │ 2,157,982.506 │
│           │ murmurHash   │       0.001 │ 1,812,469.578 │
│           │ vs fastHash   │ slower by 1.191x │
│           │ sparkHash    │       0.001 │ 707,876.901 │
│           │ vs fastHash   │ slower by 3.049x │
│           │ object-hash  │       0.003 │ 392,367.774 │
│           │ vs fastHash   │ slower by 5.500x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Number
│ Number    │ murmurHash   │       0.000 │ 12,208,771.748 │
│           │ fastHash     │       0.000 │ 3,984,659.886 │
│           │ vs murmurHash   │ slower by 3.064x │
│           │ sparkHash    │       0.001 │ 1,883,549.568 │
│           │ vs murmurHash   │ slower by 6.482x │
│           │ object-hash  │       0.002 │ 534,121.470 │
│           │ vs murmurHash   │ slower by 22.858x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Simple Object
│ Simple Object │ murmurHash   │       0.001 │ 728,066.950 │
│           │ fastHash     │       0.002 │ 522,736.857 │
│           │ vs murmurHash   │ slower by 1.393x │
│           │ sparkHash    │       0.004 │ 248,312.762 │
│           │ vs murmurHash   │ slower by 2.932x │
│           │ object-hash  │       0.010 │ 102,353.141 │
│           │ vs murmurHash   │ slower by 7.113x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Nested Object
│ Nested Object │ murmurHash   │       0.006 │ 171,401.147 │
│           │ fastHash     │       0.006 │ 167,524.883 │
│           │ vs murmurHash   │ slower by 1.023x │
│           │ sparkHash    │       0.013 │ 77,284.183 │
│           │ vs murmurHash   │ slower by 2.218x │
│           │ object-hash  │       0.020 │ 49,286.334 │
│           │ vs murmurHash   │ slower by 3.478x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Large Array
│ Large Array │ fastHash     │       0.503 │ 1,989.879 │
│           │ murmurHash   │       0.513 │ 1,949.586 │
│           │ vs fastHash   │ slower by 1.021x │
│           │ sparkHash    │       1.448 │ 690.396 │
│           │ vs fastHash   │ slower by 2.882x │
│           │ object-hash  │       3.942 │ 253.671 │
│           │ vs fastHash   │ slower by 7.844x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Complex Object
│ Complex Object │ fastHash     │       0.073 │ 13,649.240 │
│           │ murmurHash   │       0.091 │ 10,948.419 │
│           │ vs fastHash   │ slower by 1.247x │
│           │ sparkHash    │       0.233 │ 4,289.010 │
│           │ vs fastHash   │ slower by 3.182x │
│           │ object-hash  │       0.402 │ 2,489.954 │
│           │ vs fastHash   │ slower by 5.482x │
├───────────┼───────────────┼──────────────┼─────────┤

Hash Distribution Test (1000 random objects):
fastHash unique values: 1000/1000
murmurHash unique values: 1000/1000
sparkHash unique values: 1000/1000
object-hash unique values: 1000/1000
```

## Run it yourself

```bash
npm install
node src/test.js # to test hash consistency
npm run benchmark # to run benchmarks
```
