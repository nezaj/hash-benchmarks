import MurmurHash from 'imurmurhash';

// Wrapper for MurmurHash to handle objects and arrays
export default function murmurHash(input) {
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return MurmurHash(String(input)).result().toString(16);
  }

  if (input === null) return MurmurHash('null').result().toString(16);
  if (input === undefined) return MurmurHash('undefined').result().toString(16);

  // For arrays and objects, we need to serialize consistently
  if (Array.isArray(input) || typeof input === 'object') {
    const entries = Array.isArray(input)
      ? input.map((val, i) => [i, val])
      : Object.entries(input).sort();

    const hasher = MurmurHash();
    for (const [key, value] of entries) {
      hasher.hash(key.toString());
      hasher.hash(murmurHash(value));
    }
    return hasher.result().toString(16);
  }

  return MurmurHash(String(input)).result().toString(16);
}
