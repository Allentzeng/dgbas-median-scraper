
# DGBAS Median Scraper (GitHub Pages)

自動抓取 **行政院主計總處（DGBAS）**「工業及服務業受僱員工薪資統計」新聞稿中的**月平均經常性薪資中位數（全體受僱員工）**，輸出 `public/median.json` 並發佈到 **GitHub Pages**。

- 英文新聞稿（2025-02-17 發布，含 2024 年數字 37,274）：https://eng.dgbas.gov.tw/News_Content.aspx?n=4438&s=234608
- 同篇英文 PDF 備援：官方附件（路徑隨官網而異，專案內使用一個已知連結）

## 使用方式

1. 將本專案上傳到 GitHub repo（建議名稱：`dgbas-median-scraper`）。
2. Repo → Settings → Pages → Source 選 **GitHub Actions**。
3. 進到 **Actions** → workflow `scrape-dgbas` → **Run workflow**。
4. 完成後，JSON 將在：
   `https://<your-username>.github.io/dgbas-median-scraper/median.json`

## 開發
```bash
npm ci
npm run scrape
```

## 授權
MIT
