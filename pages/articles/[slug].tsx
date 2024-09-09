import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@/styles/Article.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import imageLoader from '../../imageLoader'

interface ArticleProps {
  article: {
    slug: string;
    title: string;
    date: string;
    content: string;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDirectory = path.join(process.cwd(), 'public/articles')
  const filenames = fs.readdirSync(articlesDirectory)

  const paths = filenames.map(filename => ({
    params: { slug: filename.replace('.md', '') },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  const { slug } = params as { slug: string }
  const filePath = path.join(process.cwd(), 'public/articles', `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    props: {
      article: {
        slug,
        title: data.title || slug,
        date: data.date || 'No date',
        content,
      },
    },
  }
}

const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        loader={imageLoader}
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default function Article({ article }: ArticleProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{`${article.title} | Joel Knee's Fantasyland`}</title>
        <meta name="description" content={`Article: ${article.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/" className={styles.homeLink}>Return to Home</Link>

      <main className={styles.main}>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.date}>{article.date}</p>
        <div className={styles.content}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => <CustomImage src={src || ''} alt={alt || ''} />,
              p: ({ children }) => {
                if (React.isValidElement(children) && children.type === CustomImage) {
                  return <>{children}</>
                }
                return <p>{children}</p>
              }
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  )
}