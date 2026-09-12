export const AAA_NORMAL_TEXT = 7;

export const AAA_LARGE_TEXT = 4.5;

export const NON_TEXT = 3;

export type Rgb = readonly [number, number, number];

const HEX = /^#(?:([0-9a-f]{3})|([0-9a-f]{6}))$/i;
const FUNCTIONAL = /^rgba?\(([^)]+)\)$/i;

export function parseColor(color: string): Rgb {
  const value = color.trim();
  const hex = HEX.exec(value);

  if (hex) {
    const digits = hex[1] ? [...hex[1]].map((digit) => digit + digit) : (hex[2].match(/../g) as string[]);

    return digits.map((pair) => Number.parseInt(pair, 16)) as unknown as Rgb;
  }

  const functional = FUNCTIONAL.exec(value);

  if (functional) {
    const [r, g, b] = functional[1].split(/[\s,/]+/).filter(Boolean).map(Number);

    if ([r, g, b].every((channel) => Number.isFinite(channel))) {
      return [r, g, b];
    }
  }

  throw new TypeError(`Unsupported colour: ${color}`);
}

export function relativeLuminance(color: string | Rgb): number {
  const [r, g, b] = typeof color === "string" ? parseColor(color) : color;

  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const value = channel / 255;

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

export function contrastRatio(a: string | Rgb, b: string | Rgb): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);

  return (lighter + 0.05) / (darker + 0.05);
}
