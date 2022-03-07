import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from '@emotion/styled'

import styles from '@/styles/global.module.css'
import BaseButton from '@/components/base/Button'
import TextField from '@/components/base/Textfield'
import Link from '@/components/base/Link'



const HomeButton = styled(BaseButton)`
  margin: 1rem 1rem;
`;



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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
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

        <TextField
          onChange={handleChangeValue}
          value={searchValue}
          className={styles.text_field}
          type="text"
          placeholder="例如： SnowFireWolf"
          onKeyDown={handleKeyDown}
        />

        <HomeButton onClick={handleSubmit}>
          搜尋
        </HomeButton>

        <div>
          範例：
          <Link href="/users/freeCodeCamp/repos/">freeCodeCamp</Link>
          <Link href="/users/SnowFireWolf/repos/" style={{marginLeft: "1rem"}}>SnowFireWolf</Link>
        </div>
      </main>
    </div>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}