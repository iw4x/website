/**
 * Inter's dynamic metrics.
 *
 * Inter is drawn with generous default sidebearings so that it stays legible at
 * text sizes. At display sizes those sidebearings read as gaps, so the typeface
 * expects the renderer to apply a size-dependent negative tracking:
 *
 *     tracking(z) = a + b * e^(c * z)
 *
 * where `z` is the rendered font size in CSS pixels and the result is in `em`.
 * The curve decays quickly: it is near -0.011em at body sizes and has settled
 * onto its -0.0223em asymptote by roughly 48px, which is why the whole fluid
 * display range can share a single token.
 *
 * Source: https://d.rsms.me/inter-website/v3/dynmetrics/
 */
export const TRACKING_COEFFICIENTS = {
  a: -0.0223,
  b: 0.185,
  c: -0.1745,
} as const;

export const TRACKING_PRECISION = 4;

export function interTracking(fontSizePx: number): number {
  if (!Number.isFinite(fontSizePx) || fontSizePx <= 0) {
    throw new RangeError(`Font size must be a positive finite number of pixels, got ${fontSizePx}`);
  }

  const { a, b, c } = TRACKING_COEFFICIENTS;

  return a + b * Math.exp(c * fontSizePx);
}

export function interTrackingEm(fontSizePx: number): string {
  return `${Number(interTracking(fontSizePx).toFixed(TRACKING_PRECISION))}em`;
}

export const TRACKING_TOKENS = {
  "--tracking-body": 16,
  "--tracking-heading": 32,
  "--tracking-display": 64,
} as const satisfies Record<`--tracking-${string}`, number>;
