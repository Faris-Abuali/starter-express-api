import "@mui/material/styles";
import {AppMenuPalette} from "./types";
import {CSSProperties} from "react";

declare module "@mui/material/styles" {
    interface Mixins {
        niceScroll: (configs?: NiceScrollConfigs) => {};
        showTextOverflowEllipsis: () => {};
        removeInputNumberArrows: () => {};
        hideTextFieldBorder: () => {};
        toolbar: any;
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        mixins?: MixinsOptions;
    }
}

declare module "@mui/material" {
    interface Palette {
        appMenu: AppMenuPalette;
    }
    interface PaletteOptions {
        appMenu: AppMenuPalette;
    }
}
