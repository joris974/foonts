import { Font } from "../types/font";
import { FontPairing } from "../types/font-pairing";
import { supabase } from "../lib/supabase";

export async function loadFonts(): Promise<Font[]> {
  const { data, error } = await supabase
    .from("fonts")
    .select("id, family, url, category, num_liked")
    .order("family", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Font[];
}

export async function loadRecentFontPairings(): Promise<FontPairing[]> {
  const { data, error } = await supabase
    .from("font_pairings")
    .select(
      "id, font_title_id, font_content_id, created_at, updated_at, num_views, num_liked",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as FontPairing[];
}

export async function loadPopularFontPairings(): Promise<FontPairing[]> {
  const { data, error } = await supabase
    .from("font_pairings")
    .select(
      "id, font_title_id, font_content_id, created_at, updated_at, num_views, num_liked",
    )
    .order("num_liked", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as FontPairing[];
}

export async function sendFontPairingToApi(
  titleFont: Font,
  contentFont: Font,
): Promise<FontPairing> {
  const { data, error } = await supabase.rpc("record_pairing_view", {
    p_font_title_id: titleFont.id,
    p_font_content_id: contentFont.id,
  });

  if (error) {
    throw error;
  }

  return data as FontPairing;
}

export async function sendFontPairingLikeToApi(
  titleFont: Font,
  contentFont: Font,
): Promise<FontPairing> {
  const { data, error } = await supabase.rpc("record_pairing_like", {
    p_font_title_id: titleFont.id,
    p_font_content_id: contentFont.id,
  });

  if (error) {
    throw error;
  }

  return data as FontPairing;
}
