import $ from "jquery";
import { Font } from "../types/font";

function getApiUrl() {
  return window.location.hostname === "foonts.localhost.com"
    ? "https://foonts-api.localhost.com/"
    : "https://api.foonts.net/";
}

export function loadFonts() {
  const url = `${getApiUrl()}fonts`;
  return $.ajax({ url });
}

export function loadRecentFontPairings() {
  const url = `${getApiUrl()}font-pairings/recent`;
  return $.ajax({ url }).promise();
}

export function loadPopularFontPairings() {
  const url = `${getApiUrl()}font-pairings/liked`;
  return $.ajax({ url });
}

type PostParams = {
  "font-title-id": number;
  "font-content-id": number;
};

function sendApi(url: string, postParams: PostParams) {
  return $.ajax({
    url,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(postParams)
  });
}

export function sendFontPairingToApi(titleFont: Font, contentFont: Font) {
  const url = `${getApiUrl()}font-pairings/`;
  const postParams = {
    "font-title-id": titleFont.id,
    "font-content-id": contentFont.id
  };
  return sendApi(url, postParams);
}

export function sendFontPairingLikeToApi(titleFont: Font, contentFont: Font) {
  const url = `${getApiUrl()}font-pairings/like`;
  const postParams = {
    "font-title-id": titleFont.id,
    "font-content-id": contentFont.id
  };
  return sendApi(url, postParams);
}
