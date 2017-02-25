import $ from 'jquery'

function getApiUrl() {
  return window.location.hostname === "foonts.localhost.com" ?
    "https://foonts-api.localhost.com/" :
    "https://api.foonts.net/"
}

export function loadFonts() {
  const url = `${getApiUrl()}fonts`
  return $.ajax({url})
}

export function loadRecentFontPairings() {
  const url = `${getApiUrl()}font-pairings/recent`
  return $.ajax({url})
}

export function loadPopularFontPairings() {
  const url = `${getApiUrl()}font-pairings/liked`
  return $.ajax({url})
}

function sendApi(url, postParams) {
  return $.ajax(
    { url
    , method: 'POST'
    , contentType: 'application/json'
    , data: JSON.stringify(postParams)
    }
  )
}

export function sendFontPairingToApi(titleFont, contentFont) {
  const url = `${getApiUrl()}font-pairings/`
  const postParams =
    { "font-title-id": titleFont.id
    , "font-content-id": contentFont.id
    }
  return sendApi(url, postParams)
}

export function sendFontPairingLikeToApi(titleFont, contentFont) {
  const url = `${getApiUrl()}font-pairings/like`
  const postParams =
    { "font-title-id": titleFont.id
    , "font-content-id": contentFont.id
    }
  return sendApi(url, postParams)
}
