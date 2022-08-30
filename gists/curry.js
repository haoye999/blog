const curry = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
  }

  return (...xArgs) => {
    return curry(fn, ...args, ...xArgs);
  }
}

const add = (a, b, c) => {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1, 2, 3));