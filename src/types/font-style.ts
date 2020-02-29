import { Category } from "../helpers/helper";

export interface FontProperties {
  fontSize: number;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  fontCategories: Category[];
}

export type FontWeight =
  | number
  | "inherit"
  | "normal"
  | "bold"
  | "initial"
  | "-moz-initial"
  | "revert"
  | "unset"
  | "bolder"
  | "lighter";

export type FontStyle = "normal" | "italic" | "oblique" | "initial" | "inherit";
