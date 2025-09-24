export const Fonts = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
};

export const Typography = {
  h1: { fontSize: 28, lineHeight: 34, fontFamily: Fonts.bold } as const,
  h2: { fontSize: 22, lineHeight: 28, fontFamily: Fonts.semibold } as const,
  h3: { fontSize: 18, lineHeight: 24, fontFamily: Fonts.semibold } as const,
  body: { fontSize: 16, lineHeight: 22, fontFamily: Fonts.regular } as const,
  caption: { fontSize: 13, lineHeight: 18, fontFamily: Fonts.medium } as const,
};

export type TextStyleName = keyof typeof Typography;

