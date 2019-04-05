export function numberFormatter(num, digits = 1) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function truncate(text, maxChar = 120) {
  if (text.length > maxChar) {
    return `${text.slice(0, maxChar - 3)}...`;
  }

  return text;
}