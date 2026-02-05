
# DGBAS Median Scraper (GitHub Pages)

自動抓取 **行政院主計總處（DGBAS）**「工業及服務業受僱員工薪資統計」新聞稿中的**月平均經常性薪資中位數（全體受僱員工）**，輸出 `public/median.json` 並發佈到 **GitHub Pages**，供前端以 `fetch` 直接使用。

- HTML 來源頁（英文新聞稿）：見 2025-02-17 公告，內文載明 **In 2024, the median monthly regular earnings was NT$37,274**（all employees）。citeturn7search160
- PDF 備援：同篇新聞附檔英文 PDF；解析失敗時作為備援來源。citeturn7search165

## 使用方式

1. **建立新 Repo**（例如：`dgbas-median-scraper`），把本專案內容 push 上去。
2. 在 GitHub repo → **Settings → Pages**：Source 請選 **GitHub Actions**。
3. Actions 會自動跑（或你可手動在 **Actions → scrape-dgbas → Run workflow**）。
4. 完成後，JSON 將在：

```
https://<your-username>.github.io/dgbas-median-scraper/median.json
```

> 前端可直接：
>
> ```js
> const res = await fetch('https://<your-username>.github.io/dgbas-median-scraper/median.json');
> const data = await res.json();
> console.log(data.value); // 斬殺線（中位數）
> ```

## 開發腳本

```bash
npm ci
npm run scrape   # 產生 public/median.json
```

## 工作流程（GitHub Actions）
- 每天 02:15 UTC 自動執行（台灣時間 10:15）
- 用 **Cheerio** 解析 HTML；失敗再抓 PDF（`pdf-parse`）
- 產生 `public/median.json`，發佈到 Pages

## 授權
MIT
