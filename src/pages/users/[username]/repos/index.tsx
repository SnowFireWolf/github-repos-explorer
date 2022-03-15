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

interface IPageData {
  resultData: Array<IRepo>,
  currentPage: number,
  isDataEnd: boolean,
  notFound: boolean,
  limitError: boolean,
}



export default function UserReposListPage({ username }: { username: string }) {
  // console.log("UserReposListPage rendered");

  const [pageData, setPageData] = useState<IPageData>({
    resultData: [],
    currentPage: 1,
    isDataEnd: false,
    notFound: false,
    limitError: false,
  });



  const getReposData = async (page: number) => {
    // repos 資料
    let resultData = pageData.resultData;
    // github 請求頁數
    let currentPage = pageData.currentPage;
    // repos 結尾
    let isDataEnd = pageData.isDataEnd;
    // github api 限制警告
    let limitError = pageData.limitError;
    // 是否有任何 repos
    let notFound = pageData.notFound;

    try {
      // get user repos
      const { data: result } = await request.get(`/users/${username}/repos?per_page=10&page=${page}&sort=stargazers`);

      if (result) {
        // 合併資料
        resultData = [...resultData, ...result];
      }

      // 透過回傳的資料長度來判斷是否為最後一頁
      if (result.length < 10) {
        isDataEnd = true;
      } else {
        // 如果不是的話，繼續加頁數
        currentPage = page + 1;
      }
    } catch (error: any) {
      const { status } = error.response;

      if (status === 404) {
        notFound = true;
      } else if (status === 403) {
        // 超出 github API 請求次數限制
        limitError = true;
      }
      // setNotFound(true);
      isDataEnd = true;
    }

    setPageData({
      ...pageData,
      resultData,
      currentPage,
      limitError,
      isDataEnd,
      notFound
    })
  }

  // init
  useEffect(() => {
    getReposData(pageData.currentPage);
  }, [username]);



  const loadingRef = useRef<HTMLDivElement>(null);
  // const renderCount = useRef(0);

  useEffect(() => {
    // renderCount.current += 1;
    // console.log("c render", renderCount.current);

    const observerOptions = { root: null, rootMargin: '100px', threshold: 0 };

    const observer = new IntersectionObserver((entries) => {
      // 檢查是否為底部
      if (entries[0].isIntersecting && !pageData.isDataEnd) {
        // console.log("is bottom");
        getReposData(pageData.currentPage);
      }
    }, observerOptions);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      observer.disconnect();
    }
  });



  return (
    <div className={styles.container}>
      <Head>
        <title>{username} - Repositories</title>
      </Head>

      <main className={styles.main}>
        <Link href={`/`}>&lt;- 回到首頁</Link>

        <h1 className={styles.title}>
          {username} - Repositories
        </h1>

        <div className={styles.wrapper}>
          {pageData.resultData.map((repo: IRepo, index) => (
            <RepoDetails key={index} repo={repo} username={username} />
          ))}

          {/* 載入提示 Skeleton */}
          {
            !pageData.isDataEnd && (
              <React.Fragment>
                <div ref={loadingRef}></div>
                <BaseSkeleton>
                  <h2></h2>
                  <div></div>
                  <p></p>
                </BaseSkeleton>
              </React.Fragment>
            )
          }

          {
            // 有使用者，但沒有 Repository
            pageData.resultData.length === 0 && !pageData.notFound && pageData.isDataEnd && (
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
            pageData.notFound && !pageData.limitError && (
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
            pageData.limitError && (
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
            pageData.isDataEnd && !pageData.notFound && (
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

RepoDetails.displayName = 'RepoDetails';



export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username;

  return {
    props: {
      username: username || ''
    }
  }
}
