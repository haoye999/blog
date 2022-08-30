var a = {
  i: 1,
  toString() {
    console.log('call toString');
    return this.i++;
  },
  valueOf() {
    console.log('call valueOf');
    return this.i++;
  },
  [Symbol.toPrimitive]() {
    console.log('call [Symbol.toPrimitive]');
    return this.i++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
