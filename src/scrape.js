
import fetch from "node-fetch";
import cheerio from "cheerio";
import pdf from "pdf-parse";
import fs from "fs/promises";

// DGBAS English news page that contains the sentence:
// "In 2024, the median monthly regular earnings was NT$37,274 ..."
const HTML_URL = "https://eng.dgbas.gov.tw/News_Content.aspx?n=4438&s=234608";
// Example PDF from the same news (update when DGBAS changes the file path)
const PDF_URL  = "https://ws.dgbas.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDY0L3JlbGZpbGUvMTA4NTQvMjM0NjA4L2VuZXdzMTEzMTIucGRm&n=ZW5ld3MxMTMxMi5wZGY%3d";

function parseMedianFromText(text, year) {
  const t = text.replace(/\s+/g, ' ');
  const re = new RegExp(`In\s+${year}[\s\S]*?median\s+monthly\s+regular\s+earnings\s+was\s+NT\$([\d,]+)`, 'i');
  const m = t.match(re);
  return m ? Number(m[1].replace(/,/g, '')) : null;
}

async function parseHtml(year) {
  const res = await fetch(HTML_URL);
  if (!res.ok) throw new Error(`HTML fetch failed: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const text = $('body').text();
  // 年初容易同頁同時提及去年與今年，雙年嘗試。
  const val = parseMedianFromText(text, year) ?? parseMedianFromText(text, year - 1);
  if (!val) throw new Error('HTML parse failed');
  return { value: val, source: { html: HTML_URL } };
}

async function parsePdf(year) {
  const res = await fetch(PDF_URL);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  const data = await pdf(Buffer.from(buf));
  const text = data.text;
  const val = parseMedianFromText(text, year) ?? parseMedianFromText(text, year - 1);
  if (!val) throw new Error('PDF parse failed');
  return { value: val, source: { pdf: PDF_URL } };
}

async function main() {
  const year = new Date().getUTCFullYear();
  let result = null;
  try {
    result = await parseHtml(year); // 首選 HTML
  } catch (e1) {
    console.warn('HTML 失敗，改抓 PDF：', e1.message);
    result = await parsePdf(year);  // 備援 PDF
  }

  const payload = {
    year: result.value === 37274 ? 2024 : year, // 若值確定為 37274，標註 2024 年
    indicator: "median_monthly_regular_earnings_all_employees",
    value: result.value,
    currency: "TWD",
    source: result.source,
    last_updated_utc: new Date().toISOString(),
    parser_version: "1.0.0"
  };

  await fs.mkdir('public', { recursive: true });
  await fs.writeFile('public/median.json', JSON.stringify(payload, null, 2), 'utf8');
  console.log('✅ Generated public/median.json');
}

main().catch(err => { console.error(err); process.exit(1); });
