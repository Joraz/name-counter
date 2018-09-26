export function toMap(array: string[]): Record<string, string> {
  return array.reduce((obj, currentValue) => {
    obj[currentValue] = currentValue;
    return obj;
  }, {} as Record<string, string>);
}