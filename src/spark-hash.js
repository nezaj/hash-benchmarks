import SparkMD5 from 'spark-md5';

// Wrapper for SparkHash to handle objects and arrays
export default function sparkHash(input) {
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return SparkMD5.hash(String(input));
  }

  if (input === null) return SparkMD5.hash('null');
  if (input === undefined) return SparkMD5.hash('undefined');

  // For arrays and objects, we need to serialize consistently
  if (Array.isArray(input) || typeof input === 'object') {
    const entries = Array.isArray(input)
      ? input.map((val, i) => [i, val])
      : Object.entries(input).sort();

    const spark = new SparkMD5();
    for (const [key, value] of entries) {
      spark.append(key.toString());
      spark.append(sparkHash(value));
    }
    return spark.end();
  }

  return SparkMD5.hash(String(input));
}
