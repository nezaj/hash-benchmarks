import claudeMurmur from './claude-murmur.js';
import murmurHash from './murmur-hash.js';
import hash from 'object-hash';
import fastHash from './fast-hash.js';
import sparkHash from './spark-hash.js';

const objectHash = hash.MD5;

const fns = {
  claudeMurmur,
  objectHash,
  murmurHash,
  sparkHash,
  fastHash,
  "JSON.stringify": JSON.stringify
};

const pass = {};

const n1 = {
  id: 1,
  name: 'test',
  nested: {
    a: 1,
    b: 2,
    c: [1, 2, 3]
  }
};

const n2 = {
  nested: {
    b: 2,
    c: [1, 2, 3],
    a: 1
  },
  name: 'test',
  id: 1,
};

console.log("\nThese should hash to the same")
console.log("n1", n1);
console.log("n2", n2);
for (const [name, fn] of Object.entries(fns)) {
  if (fn(n1) === fn(n2)) {
    console.log(`${name}: Pass`);
    pass[name] = pass[name] || [];
    pass[name].push("pass");
  } else {
    console.log(`${name}: No Pass`);
  }
}

const obj1 = { a: undefined };
const obj2 = {}
console.log("\nThese should not hash to the same")
console.log("obj1", obj1);
console.log("obj2", obj2);
for (const [name, fn] of Object.entries(fns)) {
  if (fn(obj1) !== fn(obj2)) {
    console.log(`${name}: Pass`);
    pass[name] = pass[name] || [];
    pass[name].push("pass");
  } else {
    console.log(`${name}: No Pass`);
  }
}

console.log("Algos that passed: ", Object.entries(pass).filter(([_, v]) => v.length == 2).map(([k]) => k));
