const PLACEHOLDER = /\{(\w+)\}/g;

export function fill(template: string, values: Readonly<Record<string, string>>): string {
  return template.replace(PLACEHOLDER, (match, name: string) => values[name] ?? match);
}
