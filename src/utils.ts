export function getRandomId() {
  return Math.random().toString(16).slice(2);
}

export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}
