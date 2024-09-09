import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import styles from '@/styles/IWrite.module.css'
import imageLoader from '../imageLoader'

interface Article {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  thumbnail: string | null;
  mtime: string;
}

export async function getStaticProps() {
  const articlesDirectory = path.join(process.cwd(), 'public/articles')
  const filenames = fs.readdirSync(articlesDirectory)

  const articles: Article[] = filenames
    .map(filename => {
      const filePath = path.join(articlesDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = fs.statSync(filePath)

      const lines = content.split('\n')
      const title = lines.find(line => line.startsWith('# '))?.slice(2) || 'No Title'
      const subtitle = lines.find(line => line.startsWith('## '))?.slice(3) || ''

      const imageMatch = content.match(/!\[.*?\]\((.*?)\)/)
      const thumbnail = imageMatch ? imageMatch[1] : null

      return {
        slug: filename.replace('.md', ''),
        title,
        subtitle,
        date: data.date || stats.birthtime.toISOString().split('T')[0],
        thumbnail,
        mtime: stats.mtime.toISOString()
      }
    })
    .sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime())
    .slice(0, 3)

  return {
    props: {
      articles
    }
  }
}

export default function IWrite({ articles }: { articles: Article[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{"I Write | Joel Knee's Fantasyland"}</title>
        <meta name="description" content="Articles by Joel Knee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/" className={styles.homeLink}>Return to Home</Link>

      <main className={styles.main}>
        <h1 className={styles.title}>I Write</h1>
        <div className={styles.articleList}>
          {articles.map((article, index) => (
            <React.Fragment key={article.slug}>
              <div className={styles.articleCard}>
                <div className={styles.articleInfo}>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                  {article.subtitle && <p className={styles.articleSubtitle}>{article.subtitle}</p>}
                  <p className={styles.articleDate}>{article.date}</p>
                  <Link href={`/articles/${article.slug}`} className={styles.readMore}>
                    Read More
                  </Link>
                </div>
                {article.thumbnail && (
                  <div className={styles.thumbnailWrapper}>
                    <Image 
                      loader={imageLoader}
                      src={article.thumbnail} 
                      alt={`Thumbnail for ${article.title}`} 
                      width={200} 
                      height={200} 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
              {index < articles.length - 1 && <hr className={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  )
}