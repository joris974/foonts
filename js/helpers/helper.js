import _ from 'lodash'

export function fontsFromUrlParams(paramsPathPiece, fontList) {
  if (_.isEmpty(paramsPathPiece)){
    return null
  }

  const paramChunks = paramsPathPiece.split("--")
  if (paramChunks.length !== 2) {
    return null
  }

  const [titleFontPathPiece, contentFontPathPiece] = paramChunks
  const fromUrl = st => st.replace(/-/g, " ")

  const [titleFontFamily, contentFontFamily] =
    [ fromUrl(titleFontPathPiece)
    , fromUrl(contentFontPathPiece)
    ]

  const findFontByFamily = family => _.find(fontList, font => font.family === family)

  const [titleFont, contentFont] =
    [ findFontByFamily(titleFontFamily)
    , findFontByFamily(contentFontFamily)
    ]

  if (_.some([titleFont, contentFont], x => !x)) {
    return null
  }

  return (
  { titleFont
    , contentFont
  }
  )
}

export function updateFontStyle(changeType, fontStyleProps) {
  const {fontSize, fontWeight, fontStyle} = fontStyleProps

  let newFontSize = fontSize
  let newFontWeight = fontWeight
  let newFontStyle = fontStyle

  if (changeType === "italic") {
    newFontStyle = fontStyle === "italic" ? "normal" : "italic"
  }
  if (changeType === "bold") {
    newFontWeight = fontWeight === "bold" ? "normal" : "bold"
  }
  const newFontStyleProps =
    { fontSize: newFontSize
    , fontWeight: newFontWeight
    , fontStyle: newFontStyle
    }
  return newFontStyleProps
}

export function fontsToUrl(titleFont, contentFont) {
  return `/#${fontsToSubUrl(titleFont, contentFont)}`
}

export function fontsToSubUrl(titleFont, contentFont) {
  const toUrlFontFamily = st => st.replace(/ /g, "-")
  return `/generate/${toUrlFontFamily(titleFont.family)}--${toUrlFontFamily(contentFont.family)}`
}

