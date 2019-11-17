const formatNumber = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return  number;
}

export const formatCount = (count) => {
  const minutes = Math.floor(count / 60);
  const formattedMinutes = formatNumber(minutes);

  const seconds = count % 60;
  const formattedSeconds = formatNumber(seconds);

  return `${formattedMinutes}:${formattedSeconds}`;
}