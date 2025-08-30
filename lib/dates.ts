export function getCurrentTZString() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
