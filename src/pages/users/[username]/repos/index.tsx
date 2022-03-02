import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'

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


  const handleGoToRepoDetail = (repo: IRepo) => {
    router.push(`/users/${username}/repos/${repo.name}`);
  }

  const getReposData = async (page: number) => {
    try {
      // get user repos
      const { data: result } = await request.get(`/users/${username}/repos?per_page=10&page=${page}&sort=stargazers`);

      if (result) {
        const newData: Array<IRepo> = [...resultData, ...result];
        console.log(newData)
        // 合併
        setResultData(newData);
      }

      if (result.length < 10) {
        setIsDataEnd(true);
      } else {
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


  const isBottom = (element: HTMLDivElement) => {
    const elementBottom = element.getBoundingClientRect().bottom;
    return elementBottom - 100 <= window.innerHeight;
  }

  // 處理滾動事件
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    if (username) {
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [username]);

  useEffect(() => {
    // console.log("onScroll");
    // console.log("offset", offset);
    // console.log("isLoading", isLoading);
    // console.log("currentPage", currentPage);
    // console.log("isDataEnd", isDataEnd);
    if (mainContainer.current) {
      const inBottom = isBottom(mainContainer.current);
      // console.log("inBottom", inBottom);
      // 如果滾到底部與資料未結束，則取得下一頁資料
      if (!isDataEnd && !isLoading && inBottom) {
        setIsLoading(true);
        getReposData(currentPage);
      }
    }
  }, [offset]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{username} - Repository list</title>
      </Head>

      <main className={styles.main} ref={mainContainer}>
        <h1 className={styles.title}>
          {username} - Repository list
        </h1>

        <div className={styles.grid} style={{ marginTop: '2rem' }}>
          {
            resultData.map((repo: IRepo, index) => {
              return (
                <div
                  onClick={() => handleGoToRepoDetail(repo)}
                  className={styles.card}
                  key={index}
                >
                  <h2>{repo.name}</h2>
                  <div style={{ minHeight: '30px' }}>{repo.description}</div>
                  <p>{repo.stargazers_count} stars</p>
                </div>
              )
            })
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
