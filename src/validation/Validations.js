export function isEmail(value) {
  const emailPattern = /^[\w-.]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;
  return emailPattern.test(value);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isNotRequired(value) {
  return value;
}

export function isFloatNumber(value) {
  const valueString = value.toString().trim();

  const numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;

  return numberRegex.test(valueString);
}
