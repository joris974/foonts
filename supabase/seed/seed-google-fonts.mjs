const catalogUrl = "https://fonts.google.com/metadata/fonts";

const categoryMap = {
  Display: "display",
  Handwriting: "handwriting",
  Monospace: "monospace",
  "Sans Serif": "sans-serif",
  Serif: "serif",
};

function sqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function googleFontsCssUrl(family) {
  const encodedFamily = encodeURIComponent(family).replaceAll("%20", "+");
  return `https://fonts.googleapis.com/css2?family=${encodedFamily}`;
}

const response = await fetch(catalogUrl);
if (!response.ok) {
  throw new Error(`Google Fonts request failed: ${response.status}`);
}

const catalog = await response.json();
const fonts = catalog.familyMetadataList
  .filter((font) => font.isOpenSource && categoryMap[font.category])
  .map((font) => ({
    family: font.family,
    url: googleFontsCssUrl(font.family),
    category: categoryMap[font.category],
  }))
  .sort((first, second) => first.family.localeCompare(second.family));

const values = fonts
  .map(
    (font) =>
      `(${sqlString(font.family)}, ${sqlString(font.url)}, ${sqlString(font.category)})`,
  )
  .join(",\n");

console.log(`-- Generated from ${catalogUrl} on ${new Date().toISOString()}`);
console.log(`-- ${fonts.length} open-source families`);
console.log(`
insert into public.fonts (family, url, category)
values
${values}
on conflict (family) do update set
  url = excluded.url,
  category = excluded.category;
`);
