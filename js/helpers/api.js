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

export function sendFontPairingToApi(titleFont, contentFont) {
  const url = `${getApiUrl()}font-pairings/`
  const postParams =
    { "font-title-id": titleFont.id
    , "font-content-id": contentFont.id
    }
  return $.ajax(
    { url
    , method: 'POST'
    , contentType: 'application/json'
    , data: JSON.stringify(postParams)
    }
  )
}
