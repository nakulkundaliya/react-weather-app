export const getHourInterval = (num: number) => {
  if (num % 3 === 0) {
    return num;
  } else {
    if ((num + 1) % 3 === 0) {
      return num + 1;
    } else {
      return num - 1;
    }
  }
};
