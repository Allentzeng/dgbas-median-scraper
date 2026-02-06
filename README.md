# 台灣斬殺線生存法則（DGBAS 自動抓取版）

本專案會 **自動爬行政院主計總處（DGBAS）** 的新聞稿，抽取「**月平均經常性薪資中位數**（全體受僱員工）」並輸出 `median.json`，同站提供 `index.html` 互動頁面讓使用者輸入月薪，比對 SAFE/GG。

- **來源（HTML）**：英文新聞稿頁面，固定句型可解析  
  <https://eng.dgbas.gov.tw/News_Content.aspx?n=4438&s=234608>
- **備援（PDF）**：同篇附件（若 HTML 解析失敗）  
  <https://ws.dgbas.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDY0L3JlbGZpbGUvMTA4NTQvMjM0NjA4L2VuZXdzMTEzMTIucGRm&n=ZW5ld3MxMTMxMi5wZGY%3d>

> 範例：英文稿明載 *In 2024, the median monthly regular earnings was NT$37,274 (all employees)*，作為 2024 年中位數依據。

## 發布後的網址

- 網頁：`https://<username>.github.io/dgbas-median-scraper/`
- JSON：`https://<username>.github.io/dgbas-median-scraper/median.json`

## 開發

```bash
npm install
npm run scrape   # 產生 public/median.json
