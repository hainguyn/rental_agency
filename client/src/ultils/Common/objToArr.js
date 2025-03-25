const objToArr = (obj) => {
  const keys = Object.keys(obj);
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key]);
  }
  return arr;
};
export default objToArr;
