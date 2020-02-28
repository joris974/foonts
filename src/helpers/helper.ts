import _ from "lodash";
import { Font } from "../types/font";

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

export function fontsFromUrlParams(
  paramsPathPiece: string | null,
  fontList: Font[]
) {
  if (paramsPathPiece === null || paramsPathPiece === undefined) {
    return {};
  }

  const paramChunks = paramsPathPiece.split("--");
  if (paramChunks.length !== 2) {
    return {};
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

  if (_.some([titleFont, contentFont], x => !x)) {
    return null;
  }

  return { titleFont, contentFont };
}

export function updateFontStyle(
  fontStyleProps: any,
  changeType: any,
  changeValue: any
) {
  const { fontSize, fontWeight, fontStyle, fontCategories } = fontStyleProps;

  let newFontSize = fontSize;
  let newFontWeight = fontWeight;
  let newFontStyle = fontStyle;
  let newFontCategories = fontCategories;

  if (changeType === "italic") {
    newFontStyle = fontStyle === "italic" ? "normal" : "italic";
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
      newFontCategories = _.difference(newFontCategories, [changeValue]);
    } else {
      newFontCategories = _.concat(newFontCategories, [changeValue]);
    }
  }

  const newFontStyleProps = {
    fontSize: newFontSize,
    fontWeight: newFontWeight,
    fontStyle: newFontStyle,
    fontCategories: newFontCategories
  };
  return newFontStyleProps;
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

export function randomFont(fontList: Font[], categories: Category[]) {
  return _.chain(fontList)
    .filter(font => categories.includes(font.category))
    .sample()
    .value();
}
