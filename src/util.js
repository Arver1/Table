export default function isNumber(value) {
  return !isNaN(value) && isFinite(value);
}
