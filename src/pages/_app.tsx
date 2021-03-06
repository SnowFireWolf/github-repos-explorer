import type { AppProps } from 'next/app'
import React from 'react'

import '@/styles/globals.css'
import styles from '@/styles/global.module.css'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Component {...pageProps} />

      <footer className={styles.footer}>
        <a href="https://snowfirewolf.github.io/" target="_blank" rel="noopener noreferrer">Kevin Zheng</a> 2022
      </footer>
    </React.Fragment>
  )
}



export default MyApp
