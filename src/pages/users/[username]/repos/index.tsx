import type { NextPage, GetStaticProps } from 'next'
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
  const username = router.query.username as string;

  let [resultData, setResultData] = useState([]);

  const handleGoToRepoDetail = (repo: IRepo) => {
    router.push(`/users/${username}/repos/${repo.name}`);
  }

  const getUserRepos = async () => {
    try {
      // get user repos
      const { data: result } = await request.get(`/users/${username}/repos?per_page=10&page=1&sort=stargazers`);
      // set state
      setResultData(result);

      console.log(result.length)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserRepos();
  }, []);

  useEffect(() => {
    getUserRepos();
  }, [username]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{username} - Repository list</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {username} - Repository list
        </h1>

        <div className={styles.grid} style={{marginTop: '2rem'}}>
          {
            resultData.map((repo: IRepo, index) => {
              console.log(repo)
              return (
                <div
                  onClick={() => handleGoToRepoDetail(repo)}
                  className={styles.card}
                  key={index}
                >
                  <h2>{repo.name}</h2>
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
