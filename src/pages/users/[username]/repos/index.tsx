import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import styles from '@/styles/global.module.css'



export default function UserReposListPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Repository list</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Repository list
        </h1>
      </main>
    </div>
  )
}
