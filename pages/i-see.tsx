import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import styles from '@/styles/ISee.module.css'

export async function getStaticProps() {
  const photosDirectory = path.join(process.cwd(), 'public/photos')
  const photoFiles = fs.readdirSync(photosDirectory)

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const photos = photoFiles
    .filter(filename => imageExtensions.includes(path.extname(filename).toLowerCase()))
    .map(filename => {
      const filePath = path.join(photosDirectory, filename)
      const stats = fs.statSync(filePath)
      return {
        filename,
        path: `/photos/${filename}`,
        mtime: stats.mtime.toISOString()
      }
    })
    .sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime())

  return {
    props: {
      photos
    }
  }
}

export default function ISee({ photos }: { photos: Array<{ filename: string, path: string, mtime: string }> }) {
  const [page, setPage] = useState(0)
  const currentPhotos = photos.slice(page * 9, (page + 1) * 9)

  return (
    <div className={styles.container}>
      <Head>
        <title>{"I See | Joel Knee's Fantasyland"}</title>
        <meta name="description" content="Photos by Joel Knee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/" className={styles.homeLink}>Return to Home</Link>

      <main className={styles.main}>
        <h1 className={styles.title}>I See</h1>
        <div className={styles.photoGrid}>
          {currentPhotos.map((photo, index) => (
            <div key={index} className={styles.photoWrapper}>
              <Image 
                src={photo.path} 
                alt={`Photo ${index + 1}`} 
                width={200} 
                height={200} 
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div className={styles.navigation}>
          {page > 0 && (
            <button onClick={() => setPage(page - 1)} className={styles.navButton}>
              &lt;
            </button>
          )}
          {(page + 1) * 9 < photos.length && (
            <button onClick={() => setPage(page + 1)} className={styles.navButton}>
              &gt;
            </button>
          )}
        </div>
      </main>
    </div>
  )
}