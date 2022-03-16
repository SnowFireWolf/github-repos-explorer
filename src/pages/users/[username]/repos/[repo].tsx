import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
// api
import request from '@/utils/request'

import styles from '@/styles/global.module.css'
import BaseSkeleton from '@/components/base/Skeleton'
import BaseButton from '@/components/base/Button'
import BaseCard from '@/components/base/Card'
import Link from '@/components/base/Link'



interface IRepo {
  [key: string]: string | number
}

interface IPageData {
  resultData: IRepo,
  isLoading: boolean,
  notFoundRepo: boolean,
}



const RepoButton = styled(BaseButton)`
  margin-top: 1rem;
`;



export default function UserRepoDetailPage({ username, repo }: { username: string, repo: string }) {
  const [pageData, setPageData] = useState<IPageData>({
    resultData: {},
    isLoading: true,
    notFoundRepo: false,
  });

  useEffect(() => {
    // 確保 username 已經設定
    if (username) {
      (async () => {
        let resultData = pageData.resultData;
        let notFoundRepo = pageData.notFoundRepo;

        try {
          // get user repos
          const { data: result } = await request.get(`/repos/${username}/${repo}`);
          resultData = result;
        } catch (error) {
          console.error(error);
          notFoundRepo = true;
        }

        // set state
        setPageData({
          resultData,
          isLoading: false,
          notFoundRepo,
        });
      })();
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{repo} - Repository Detail</title>
      </Head>

      <main className={styles.main}>
        <Link href={`/users/${username}/repos`}>&lt;- 回到 {username} repos</Link>
        { /*<h3>{resultData.full_name}</h3>*/}

        {
          // 載入中
          pageData.isLoading ? (
            <BaseSkeleton>
              <h2></h2>
              <div></div>
              <p></p>
            </BaseSkeleton>
          ) : (
            <BaseCard>
              {
                pageData.notFoundRepo ? (
                  <div>
                    <h3>Repository not found</h3>
                    <p>
                      沒有找到這個 Repository
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3>{username}/{repo}</h3>
                    <p>{pageData.resultData.description}</p>
                    <h3>{pageData.resultData.stargazers_count} stars</h3>
                    <RepoButton
                      as="a"
                      href={`https://github.com/${pageData.resultData.full_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >前往 Github</RepoButton>
                  </div>
                )
              }
            </BaseCard>
          )
        }
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
