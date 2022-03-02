import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import styles from '@/styles/global.module.css'



export default function ReposDetailsPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Repository Details</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Repository Details
        </h1>
      </main>
    </div>
  )
}
