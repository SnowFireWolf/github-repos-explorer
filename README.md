# github-repos-explorer

2022 Dcard Frontend Intern Home Work

此專案使用 [Next.js](https://nextjs.org/) ，並使用 [swc](https://nextjs.org/docs/advanced-features/compiler)，因此打包與開發的編譯速度會很快。

已使用 Vercel 自動部屬 [https://github-repos-explorer-eight.vercel.app](https://github-repos-explorer-eight.vercel.app) 。



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
  
  畫面：
  ![Image_2022_03_17__15_34_45__001](https://user-images.githubusercontent.com/14024836/158759441-501e4f4c-cd6b-407f-a544-15af6d9965df.png)

* src/pages/users/[username]
  * /index.tsx => `users/{username}/repos`

    列出使用者儲存庫的路徑
    
    畫面：
    ![Image_2022_03_17__15_35_24__001](https://user-images.githubusercontent.com/14024836/158759534-55873ae5-856f-4a1c-bfb1-540c6c8f6a15.png)

  * /[repo].tsx => `users/{username}/repos/{repo}`

    單一儲存庫資訊
    
    畫面：
    ![Image_2022_03_17__15_36_57__001](https://user-images.githubusercontent.com/14024836/158759742-a4cde75e-5cd6-4cec-9fb3-cbb93cef50d8.png) 

### 組件

`src/components/base` 中可能會有復用的基本樣式組件，例如：按鈕、卡片。

### 復用工具

`src/utils`

* request.ts ，使用 axios 包裝，設定會經常使用的網域，用於請求 API。





## 例外狀況
* 找不到使用者
![Image_2022_03_17__15_38_24__001](https://user-images.githubusercontent.com/14024836/158759974-0c0745c6-9e73-49fc-8c5f-b62068049ce2.png)

* 有使用者，但是沒有任何儲存庫
![Image_2022_03_17__15_49_27__001](https://user-images.githubusercontent.com/14024836/158761703-11ff3f0e-a03c-4e77-bb03-341a839007c6.png)

* github API 速率限制通知
![Image_2022_03_17__15_55_53__001](https://user-images.githubusercontent.com/14024836/158762809-bfc4cc38-0dd0-4757-9a13-6a3dda5a8dc2.png)

* 沒有網路連線
![Image_2022_03_17__15_33_23__001](https://user-images.githubusercontent.com/14024836/158759242-514a33c4-822b-443a-875e-f49d751f499f.png)
