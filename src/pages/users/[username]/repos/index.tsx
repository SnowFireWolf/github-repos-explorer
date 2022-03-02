import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, ReactEventHandler } from 'react'

import styles from '@/styles/global.module.css'

import request from '@/utils/request'



interface IRepo {
  [key: string]: string | number
}



export default function UserReposListPage({ username }: { username: string }) {
  const router = useRouter();

  const mainContainer = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<Array<IRepo>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataEnd, setIsDataEnd] = useState(false);
  const [offset, setOffset] = useState(0);



  // 前往連結
  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const href = event.currentTarget.getAttribute('href');

    if (href) {
      router.push(href);
    }
  }

  const getReposData = async (page: number) => {
    try {
      // get user repos
      const { data: result } = await request.get(`/users/${username}/repos?per_page=10&page=${page}&sort=stargazers`);

      if (result) {
        // 合併資料
        const newData: Array<IRepo> = [...resultData, ...result];
        setResultData(newData);
      }

      // 透過回傳的資料長度來判斷是否為最後一頁
      if (result.length < 10) {
        setIsDataEnd(true);
      } else {
        // 如果不是的話，繼續加頁數
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  // init
  useEffect(() => {
    getReposData(currentPage);
  }, []);

  // 處理滾動事件
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    if (username) {
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [username]);

  // 是否在底部
  const isBottom = (element: HTMLDivElement) => {
    const elementBottom = element.getBoundingClientRect().bottom;
    return elementBottom - 100 <= window.innerHeight;
  }

  // 處理滾動事件
  useEffect(() => {
    if (mainContainer.current) {
      const inBottom = isBottom(mainContainer.current);
      // 這裡的偵測包含
      // 1. 是否在底部
      // 2. 是否正在載入中
      // 3. 是否是最後一頁
      if (!isDataEnd && !isLoading && inBottom) {
        setIsLoading(true);
        getReposData(currentPage);
      }
    }
  }, [offset]);



  return (
    <div className={styles.container}>
      <Head>
        <title>{username} - Repositories</title>
      </Head>

      <main className={styles.main} ref={mainContainer}>
        <h1 className={styles.title}>
          {username} - Repositories
        </h1>

        <div className={styles.wrapper}>
          {
            resultData.map((repo: IRepo, index) => {
              return (
                <a
                  onClick={handleLinkClick}
                  className={styles.card}
                  href={`/users/${username}/repos/${repo.name}`}
                  key={index}
                >
                  <h2>{repo.name}</h2>
                  <div style={{ minHeight: '30px' }}>{repo.description}</div>
                  <p>{repo.stargazers_count} stars</p>
                </a>
              )
            })
          }

          {
            isDataEnd ? (
              <div>
                <h4>已經最底惹</h4>
              </div>
            ) : (
              <div className={styles.card}>
                <h2 className={styles.skeleton}></h2>
                <div className={styles.skeleton}></div>
                <p className={styles.skeleton}></p>
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username;

  return {
    props: {
      username: username || ''
    }
  }
}
