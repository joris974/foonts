import { Font } from "../types/font";
import { FontPairing } from "../types/font-pairing";

function getApiUrl() {
  return window.location.hostname === "foonts.localhost.com"
    ? "https://foonts-api.localhost.com/"
    : "https://api.foonts.net/";
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export function loadFonts(): Promise<Font[]> {
  const url = `${getApiUrl()}fonts`;
  return request<Font[]>(url);
}

export function loadRecentFontPairings(): Promise<FontPairing[]> {
  const url = `${getApiUrl()}font-pairings/recent`;
  return request<FontPairing[]>(url);
}

export function loadPopularFontPairings(): Promise<FontPairing[]> {
  const url = `${getApiUrl()}font-pairings/liked`;
  return request<FontPairing[]>(url);
}

type PostParams = {
  "font-title-id": number;
  "font-content-id": number;
};

function sendApi(url: string, postParams: PostParams) {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postParams),
  });
}

export function sendFontPairingToApi(titleFont: Font, contentFont: Font) {
  const url = `${getApiUrl()}font-pairings/`;
  const postParams = {
    "font-title-id": titleFont.id,
    "font-content-id": contentFont.id,
  };
  return sendApi(url, postParams);
}

export function sendFontPairingLikeToApi(titleFont: Font, contentFont: Font) {
  const url = `${getApiUrl()}font-pairings/like`;
  const postParams = {
    "font-title-id": titleFont.id,
    "font-content-id": contentFont.id,
  };
  return sendApi(url, postParams);
}
