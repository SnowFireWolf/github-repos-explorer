import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, memo } from 'react'

import styles from '@/styles/global.module.css'
import BaseSkeleton from '@/components/base/Skeleton'
import BaseCard from '@/components/base/Card'
import Link from '@/components/base/Link'
import request from '@/utils/request'



interface IRepo {
  [key: string]: string | number
}



export default function UserReposListPage({ username }: { username: string }) {
  console.log("c render");
  const mainContainer = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataEnd, setIsDataEnd] = useState(false);
  const [offset, setOffset] = useState(0);
  const [resultData, setResultData] = useState<Array<IRepo>>([]);
  const [notFound, setNotFound] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const renderCount = useRef(0);


  useEffect(() => {
    renderCount.current += 1;
  })

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
    } catch (error: any) {
      const { status } = error.response;
      if (status === 404) {
        setNotFound(true);
      } else if (status === 403) {
        // 超出 github API 請求次數限制
        setLimitError(true);
      }
      // setNotFound(true);
      setIsDataEnd(true);
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
        <Link href={`/`}>&lt;- 回到首頁</Link>

        <h1 className={styles.title}>
          {username} - Repositories
        </h1>

        <div className={styles.wrapper}>
          {resultData.map((repo: IRepo, index) => (
            <RepoDetails key={index} repo={repo} username={username} />
          ))}

          {
            // 載入中
            isLoading && (
              <BaseSkeleton>
                <h2></h2>
                <div></div>
                <p></p>
              </BaseSkeleton>
            )
          }

          {
            // 有使用者，但沒有 Repository
            !isLoading && resultData.length === 0 && !notFound && (
              <BaseCard>
                <h2>沒有找到任何 Repository</h2>
                <p>
                  使用者 <strong>{username}</strong> 目前沒有任何 Repository
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <Link href="/">回到首頁</Link>
                </div>
              </BaseCard>
            )
          }
          {
            // 沒有找到使用者
            notFound && !limitError && (
              <BaseCard>
                <h2>沒有找到這個使用者</h2>
                <p>
                  使用者 <strong>{username}</strong> 不存在
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <Link href="/">回到首頁</Link>
                </div>
              </BaseCard>
            )
          }

          {
            // 超出 github API 請求次數限制
            limitError && (
              <BaseCard>
                <h2>超出 Github API 請求速率限制</h2>
                <p>
                  滾動ㄉ太快惹，先休息一下，晚點再試試
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <Link href="/">回到首頁</Link>
                </div>
              </BaseCard>
            )
          }

          {
            // 已經在資料結尾
            isDataEnd && !notFound && (
              <div>
                <h4>已經最底惹</h4>
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}




const RepoDetails = React.memo<{ repo: IRepo, username: string }>(({ repo, username }) => {
  const router = useRouter();

  // 前往連結
  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const href = event.currentTarget.getAttribute('href');

    if (href) {
      router.push(href);
    }
  }

  return (
    <React.Fragment>
      <BaseCard
        as="a"
        onClick={handleLinkClick}
        href={`/users/${username}/repos/${repo.name}`}
      >
        <h2>{repo.name}</h2>
        <div style={{ minHeight: '30px' }}>{repo.description}</div>
        <p>{repo.stargazers_count} stars</p>
      </BaseCard>
    </React.Fragment>
  );
});



export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username;

  return {
    props: {
      username: username || ''
    }
  }
}
