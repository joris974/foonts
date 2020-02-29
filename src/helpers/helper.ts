import sample from "lodash/sample";
import difference from "lodash/difference";
import concat from "lodash/concat";
import { Font } from "../types/font";
import { FontProperties } from "../types/font-style";

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

export function updateFontProperties(
  fontProperties: FontProperties,
  changeType: any,
  changeValue: any
) {
  const { fontSize, fontWeight, fontStyle, fontCategories } = fontProperties;

  let newFontSize = fontSize;
  let newFontWeight = fontWeight;
  let newFontProperties = fontStyle;
  let newFontCategories = fontCategories;

  if (changeType === "italic") {
    newFontProperties = fontStyle === "italic" ? "normal" : "italic";
  }
  if (changeType === "bold") {
    newFontWeight = fontWeight === "bold" ? "normal" : "bold";
  }
  if (changeType === "increment") {
    newFontSize = newFontSize + 1;
  }

  if (changeType === "decrement") {
    newFontSize = newFontSize - 1;
  }

  if (changeType === "category") {
    if (newFontCategories.includes(changeValue)) {
      newFontCategories = difference(newFontCategories, [changeValue]);
    } else {
      newFontCategories = concat(newFontCategories, [changeValue]);
    }
  }

  const newFontPropertiesProps = {
    fontSize: newFontSize,
    fontWeight: newFontWeight,
    fontStyle: newFontProperties,
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
