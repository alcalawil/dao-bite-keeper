const createRage = (first, last) => {
  return Array.from(new Array(last - first + 1), (x, i) => i + first);
};

module.exports = { createRage };
