export const ctaVariants = ['primary', 'secondary'] as const;
export const ctaSizes = ['small', 'regular', 'medium', 'big'] as const;

export type CtaVariant = (typeof ctaVariants)[number];
export type CtaSize = (typeof ctaSizes)[number];
