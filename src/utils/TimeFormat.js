export const timeFormat = (totalTimeInSecs: number) => {
  const h = Math.floor(totalTimeInSecs / 3600)
    .toString()
    .padStart(2, '0');

  let m = Math.floor((totalTimeInSecs % 3600) / 60)
    .toString()
    .padStart(2, '0');

  let s = Math.floor(totalTimeInSecs % 60)
    .toString()
    .padStart(2, '0');

  if (+s > 31) {
    m = (parseInt(m) + 1).toString().padStart(2, '0');
  }

  if (+h > 0) {
    // return h + ':' + m + ':' + s;
    return h + ':' + m + ':' + '00';
  } else {
    // return m + ':' + s;
    return m + ':' + '00';
  }
};
