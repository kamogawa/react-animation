import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    contrastTextColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}