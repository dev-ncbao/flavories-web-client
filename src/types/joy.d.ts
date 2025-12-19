import '@mui/joy/styles';

declare module '@mui/joy/styles' {
    interface ColorPalettePropOverrides {
        // Tailwind color extensions
        slate: true;
        gray: true;
        zinc: true;
        stone: true;
        red: true;
        orange: true;
        amber: true;
        yellow: true;
        lime: true;
        green: true;
        emerald: true;
        teal: true;
        cyan: true;
        sky: true;
        blue: true;
        indigo: true;
        violet: true;
        purple: true;
        fuchsia: true;
        pink: true;
        rose: true;
        stale: true;
    }

    interface Palette {
        slate: PaletteRange;
        gray: PaletteRange;
        zinc: PaletteRange;
        stone: PaletteRange;
        red: PaletteRange;
        orange: PaletteRange;
        amber: PaletteRange;
        yellow: PaletteRange;
        lime: PaletteRange;
        green: PaletteRange;
        emerald: PaletteRange;
        teal: PaletteRange;
        cyan: PaletteRange;
        sky: PaletteRange;
        blue: PaletteRange;
        indigo: PaletteRange;
        violet: PaletteRange;
        purple: PaletteRange;
        fuchsia: PaletteRange;
        pink: PaletteRange;
        rose: PaletteRange;
        stale: PaletteRange;
    }
}
