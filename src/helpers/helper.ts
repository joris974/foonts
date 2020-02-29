import sample from "lodash/sample";
import difference from "lodash/difference";
import concat from "lodash/concat";
import { Font } from "../types/font";
import { FontProperties, FontStyle, FontWeight } from "../types/font-style";

export enum Category {
  Display = "display",
  Serif = "serif",
  SansSerif = "sans-serif",
  Monospace = "monospace",
  Handwriting = "handwriting"
}

export function allCategories(): Category[] {
  return [
    Category.Display,
    Category.Serif,
    Category.SansSerif,
    Category.Monospace,
    Category.Handwriting
  ];
}

export function extractFromMatch(
  match: any,
  fontList: Font[]
): { titleFont: Font; contentFont: Font } | null {
  const fontsParams = match && match.params && match.params.fonts;

  if (fontsParams === null || fontsParams === undefined) {
    return null;
  }

  const paramChunks = fontsParams.split("--");
  if (paramChunks.length !== 2) {
    return null;
  }

  const [titleFontPathPiece, contentFontPathPiece] = paramChunks;
  const fromUrl = (st: string) => st.replace(/-/g, " ");

  const [titleFontFamily, contentFontFamily] = [
    fromUrl(titleFontPathPiece),
    fromUrl(contentFontPathPiece)
  ];

  const findFontByFamily = (family: string) =>
    fontList.find(font => font.family === family);

  const [titleFont, contentFont] = [
    findFontByFamily(titleFontFamily),
    findFontByFamily(contentFontFamily)
  ];

  if (
    titleFont === null ||
    titleFont === undefined ||
    contentFont === null ||
    contentFont === undefined
  ) {
    return null;
  }

  return { titleFont, contentFont };
}

export type UpdateFontProperties =
  | { type: "fontSize"; action: "increment" | "decrement" }
  | { type: "fontStyle"; value: FontStyle }
  | { type: "fontWeight"; value: FontWeight }
  | { type: "category"; value: Category };

export function updateFontProperties(
  fontProperties: FontProperties,
  update: UpdateFontProperties
) {
  const { fontSize, fontWeight, fontStyle, fontCategories } = fontProperties;

  let newFontSize = fontSize;
  let newFontWeight = fontWeight;
  let newFontStyle = fontStyle;
  let newFontCategories = fontCategories;

  switch (update.type) {
    case "fontSize":
      if (update.action === "increment") {
        newFontSize = newFontSize + 1;
      } else if (update.action === "decrement") {
        newFontSize = newFontSize - 1;
      }
      break;
    case "fontStyle":
      newFontStyle = fontStyle === "italic" ? "normal" : "italic";
      break;
    case "fontWeight":
      newFontWeight = fontWeight === "bold" ? "normal" : "bold";
      break;
    case "category":
      if (newFontCategories.includes(update.value)) {
        newFontCategories = difference(newFontCategories, [update.value]);
      } else {
        newFontCategories = concat(newFontCategories, [update.value]);
      }
      break;
  }

  const newFontPropertiesProps = {
    fontSize: newFontSize,
    fontWeight: newFontWeight,
    fontStyle: newFontStyle,
    fontCategories: newFontCategories
  };
  return newFontPropertiesProps;
}

export function fontsToUrl(titleFont: Font, contentFont: Font) {
  return fontsToSubUrl(titleFont, contentFont);
}

export function fontsToSubUrl(titleFont: Font, contentFont: Font) {
  const toUrlFontFamily = (st: string) => st.replace(/ /g, "-");
  return `/generate/${toUrlFontFamily(titleFont.family)}--${toUrlFontFamily(
    contentFont.family
  )}`;
}

export function labelForCategory(category: Category) {
  switch (category) {
    case "serif":
      return "Serif";
    case "sans-serif":
      return "Sans serif";
    case "display":
      return "Cursive";
    case "handwriting":
      return "Handwriting";
    case "monospace":
      return "Monospace";
    default:
      throw new Error(`Invalid category`);
  }
}

export function randomFont(fontList: Font[], categories: Category[]): Font {
  const fontsInCategory = fontList.filter(font =>
    categories.includes(font.category)
  );
  const randomFont = sample(fontsInCategory);
  if (randomFont === null || randomFont === undefined) {
    throw new Error("Empty list");
  }
  return randomFont;
}
