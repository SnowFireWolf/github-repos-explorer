import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
// api
import request from '@/utils/request'

import styles from '@/styles/global.module.css'
import BaseButton from '@/components/base/Button'
import BaseCard from '@/components/base/Card'
import Link from '@/components/base/Link'



interface IRepo {
  [key: string]: string | number
}



const RepoButton = styled(BaseButton)`
  margin-top: 1rem;
`;



export default function UserReposListPage({ username, repo }: { username: string, repo: string }) {
  const [resultData, setResultData] = useState<IRepo>({});
  const [notFoundRepo, setNotFoundRepo] = useState(false);

  useEffect(() => {
    // 確保 username 已經設定
    if (username) {
      (async () => {
        try {
          // get user repos
          const { data: result } = await request.get(`/repos/${username}/${repo}`);
          // set state
          setResultData(result);

          setNotFoundRepo(false);
        } catch (error) {
          console.error(error);
          setNotFoundRepo(true);
        }
      })();
    }
  }, [username, repo]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{repo} - Repository Detail</title>
      </Head>

      <main className={styles.main}>
        <Link href={`/users/${username}/repos`}>&lt;- 回到 {username} repos</Link>
        { /*<h3>{resultData.full_name}</h3>*/}
        <BaseCard>
          {
            notFoundRepo ? (
              <div>
                <h3>Repository not found</h3>
                <p>
                  沒有找到這個 Repository
                </p>
              </div>
            ) : (
              <div>
                <h3>{username}/{repo}</h3>
                <p>{resultData.description}</p>
                <h3>{resultData.stargazers_count} stars</h3>
                <RepoButton
                  as="a"
                  href={`https://github.com/${resultData.full_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >前往 Github</RepoButton>
              </div>
            )
          }
        </BaseCard>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username;
  const repo = context.params?.repo;

  return {
    props: {
      username: username || '',
      repo: repo || '',
    }
  }
}
