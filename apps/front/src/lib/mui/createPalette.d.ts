import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
    neutral: Palette['primary'];
    tertiary: Palette['primary'];
  }

  export interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    tertiary: PaletteOptions['primary'];
  }

  export interface PaletteColorOptions {
    lighter?: string;
    lighter2?: string;
    lighter3?: string;
  }

  export interface SimplePaletteColorOptions {
    lighter?: string;
    lighter2?: string;
    lighter3?: string;
  }
}
