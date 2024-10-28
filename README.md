# Universal Hash Benchmark

Compares different hashing algorithms for performance and hash distribution.

Claude came up with the fastest hashing algorithm by using a specific approach
to MurmurHash.

## Results
```
Running 10,000 iterations per test...

│ Test Case │ Implementation │ Time/Op (ms) │ Ops/Sec │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Simple String
│ Simple String │ claudeMurmur │       0.000 │ 2,687,389.892 │
│           │ fastHash     │       0.000 │ 2,084,600.205 │
│           │ vs claudeMurmur   │ slower by 1.289x │
│           │ murmurHash   │       0.001 │ 1,811,006.147 │
│           │ vs claudeMurmur   │ slower by 1.484x │
│           │ sparkHash    │       0.001 │ 706,928.156 │
│           │ vs claudeMurmur   │ slower by 3.802x │
│           │ object-hash  │       0.003 │ 387,809.844 │
│           │ vs claudeMurmur   │ slower by 6.930x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Number
│ Number    │ murmurHash   │       0.000 │ 11,921,922.468 │
│           │ fastHash     │       0.000 │ 4,033,614.480 │
│           │ vs murmurHash   │ slower by 2.956x │
│           │ claudeMurmur │       0.000 │ 2,073,219.582 │
│           │ vs murmurHash   │ slower by 5.750x │
│           │ sparkHash    │       0.001 │ 1,922,091.377 │
│           │ vs murmurHash   │ slower by 6.203x │
│           │ object-hash  │       0.002 │ 562,030.633 │
│           │ vs murmurHash   │ slower by 21.212x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Simple Object
│ Simple Object │ claudeMurmur │       0.001 │ 1,105,746.290 │
│           │ murmurHash   │       0.001 │ 719,172.194 │
│           │ vs claudeMurmur   │ slower by 1.538x │
│           │ fastHash     │       0.002 │ 523,980.869 │
│           │ vs claudeMurmur   │ slower by 2.110x │
│           │ sparkHash    │       0.004 │ 247,465.281 │
│           │ vs claudeMurmur   │ slower by 4.468x │
│           │ object-hash  │       0.010 │ 102,435.532 │
│           │ vs claudeMurmur   │ slower by 10.795x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Nested Object
│ Nested Object │ claudeMurmur │       0.003 │ 384,864.545 │
│           │ murmurHash   │       0.006 │ 169,663.822 │
│           │ vs claudeMurmur   │ slower by 2.268x │
│           │ fastHash     │       0.006 │ 166,642.481 │
│           │ vs claudeMurmur   │ slower by 2.310x │
│           │ sparkHash    │       0.013 │ 76,937.257 │
│           │ vs claudeMurmur   │ slower by 5.002x │
│           │ object-hash  │       0.020 │ 49,283.692 │
│           │ vs claudeMurmur   │ slower by 7.809x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Large Array
│ Large Array │ claudeMurmur │       0.097 │ 10,293.192 │
│           │ fastHash     │       0.514 │ 1,944.694 │
│           │ vs claudeMurmur   │ slower by 5.293x │
│           │ murmurHash   │       0.516 │ 1,939.723 │
│           │ vs claudeMurmur   │ slower by 5.307x │
│           │ sparkHash    │       1.440 │ 694.209 │
│           │ vs claudeMurmur   │ slower by 14.827x │
│           │ object-hash  │       3.926 │ 254.685 │
│           │ vs claudeMurmur   │ slower by 40.415x │
├───────────┼───────────────┼──────────────┼─────────┤
Test case: Complex Object
│ Complex Object │ claudeMurmur │       0.022 │ 46,485.790 │
│           │ fastHash     │       0.073 │ 13,631.932 │
│           │ vs claudeMurmur   │ slower by 3.410x │
│           │ murmurHash   │       0.091 │ 10,958.881 │
│           │ vs claudeMurmur   │ slower by 4.242x │
│           │ sparkHash    │       0.234 │ 4,274.152 │
│           │ vs claudeMurmur   │ slower by 10.876x │
│           │ object-hash  │       0.401 │ 2,491.128 │
│           │ vs claudeMurmur   │ slower by 18.661x │
├───────────┼───────────────┼──────────────┼─────────┤

Hash Distribution Test (1000 random objects):
fastHash unique values: 1000/1000
murmurHash unique values: 1000/1000
sparkHash unique values: 1000/1000
object-hash unique values: 1000/1000
claudeMurmur unique values: 1000/1000
```


## Run it yourself

```bash
npm install
npm run benchmark
```
