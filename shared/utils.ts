export function compactNumber(num: number) {
  let suffix = "";
  if (num > 1000) {
    num /= 1000;
    suffix = "K";
  }
  if (num > 1000) {
    num /= 1000;
    suffix = "M";
  }
  return Math.round(num) + suffix;
}
