import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import styles from '@/styles/global.module.css'



export default function HomePage() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');


  const handleChangeValue = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  }

  const handleSubmit = () => {
    if(searchValue) {
      router.push(`/users/${searchValue}/repos`);
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Github Repo Search</title>
        <meta name="description" content="搜尋 Github 使用者倉庫ㄉ小工具" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Github Repo Search
        </h1>

        <p className={styles.description}>
          在下方欄位輸入要搜尋的使用者名稱
        </p>

        <input
          onChange={handleChangeValue}
          value={searchValue}
          className={styles.text_field}
          type="text"
          placeholder="例如： SnowFireWolf"
        />

        <button onClick={handleSubmit} className={styles.button}>
          搜尋
        </button>
      </main>
    </div>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}