2022 Dcard Frontend Intern Home Work

此專案使用 [Next.js](https://nextjs.org/) ，並使用 [swc](https://nextjs.org/docs/advanced-features/compiler)，因此打包與開發的編譯速度會很快。

已使用 Vercel 自動部屬 [https://github-repos-explorer-eight.vercel.app](https://github-repos-explorer-eight.vercel.app) 。


## 使用的套件
* `next`
透過檔案命名自動處理好 router，編譯程式碼。

* `axios`
處理 API 串接，自動轉換 JSON 格式。

* `@emotion/styled`
快速製作復用組件。



## 設計架構

### 路徑
`src/pages` 中的路徑檔案將會被 next 自動轉換。

* src/pages/inxex.tsx => `/`

  此為首頁，可以在輸入欄位輸入使用者名稱並搜尋儲存庫。

* src/pages/users/[username]
  * /index.tsx => `users/{username}/repos`

    列出使用者儲存庫的路徑

  * /[repo].tsx => `users/{username}/repos/{repo}`

    單一儲存庫資訊

### 組件

`src/components/base` 中可能會有復用的基本樣式組件，例如：按鈕、卡片。

### 復用工具

`src/utils`

* request.ts ，使用 axios 包裝，設定會經常使用的網域，用於請求 API。




## 入門開始

### git clone 此專案
```bash
git clone https://github.com/SnowFireWolf/github-repos-explorer.git
```

### 安裝套件
```bash
yarn
# 或是使用 npm
npm install
```

### 開發模式
```bash
yarn dev
# 或是使用 npm
npm run dev
```

在瀏覽器打開 [http://localhost:3000](http://localhost:3000) ，就可看到網站惹。

### 也可以使用生產模式，先打包在瀏覽
```bash
yarn build
# 或是使用 npm
npm run build
```
編譯完後使用
```bash
yarn start
# 或是使用 npm
npm run start
```

在瀏覽器打開 [http://localhost:3000](http://localhost:3000) ，一樣就可以看到。
