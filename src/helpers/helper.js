import _ from "lodash";

export function allCategories() {
  return ["display", "serif", "sans-serif", "monospace", "handwriting"];
}

export function fontsFromUrlParams(paramsPathPiece, fontList) {
  if (_.isEmpty(paramsPathPiece)) {
    return {};
  }

  const paramChunks = paramsPathPiece.split("--");
  if (paramChunks.length !== 2) {
    return {};
  }

  const [titleFontPathPiece, contentFontPathPiece] = paramChunks;
  const fromUrl = st => st.replace(/-/g, " ");

  const [titleFontFamily, contentFontFamily] = [
    fromUrl(titleFontPathPiece),
    fromUrl(contentFontPathPiece)
  ];

  const findFontByFamily = family =>
    _.find(fontList, font => font.family === family);

  const [titleFont, contentFont] = [
    findFontByFamily(titleFontFamily),
    findFontByFamily(contentFontFamily)
  ];

  if (_.some([titleFont, contentFont], x => !x)) {
    return null;
  }

  return { titleFont, contentFont };
}

export function updateFontStyle(fontStyleProps, changeType, changeValue) {
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
    if (_.includes(newFontCategories, changeValue)) {
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

export function fontsToUrl(titleFont, contentFont) {
  return fontsToSubUrl(titleFont, contentFont);
}

export function fontsToSubUrl(titleFont, contentFont) {
  const toUrlFontFamily = st => st.replace(/ /g, "-");
  return `/generate/${toUrlFontFamily(titleFont.family)}--${toUrlFontFamily(
    contentFont.family
  )}`;
}

export function labelForCategory(category) {
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
  }
}

export function randomFont(fontList, categories) {
  return _.chain(fontList)
    .filter(font => _.includes(categories, font.category))
    .sample()
    .value();
}
