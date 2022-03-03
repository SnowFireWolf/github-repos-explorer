import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import styles from '@/styles/global.module.css'

import request from '@/utils/request'



interface IRepo {
  [key: string]: string | number
}



export default function UserReposListPage() {
  const router = useRouter();

  const [searchInfo, setSearchInfo] = useState({
    username: '',
    repo: '',
  });
  const [resultData, setResultData] = useState<IRepo>({});

  // 確保 router 已經載入完成
  useEffect(() => {
    if (router.isReady) {
      const query = router.query as { username: string, repo: string };
      setSearchInfo({
        username: query.username,
        repo: query.repo,
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    const username = searchInfo.username;
    const repo = searchInfo.repo;

    // 確保 username 已經設定
    if (username) {
      (async () => {
        try {
          // get user repos
          const { data: result } = await request.get(`/repos/${username}/${repo}`);
          // set state
          setResultData(result);

          console.log(result.length)
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [searchInfo]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{searchInfo.repo} - Repository Detail</title>
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          {searchInfo.username}/{searchInfo.repo}
        </h3>

        <div>
          <h3>{resultData.full_name}</h3>
          <h3>{resultData.description}</h3>
          <h3>{resultData.stargazers_count}</h3>
        </div>
      </main>
    </div>
  )
}
