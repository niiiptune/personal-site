import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import styles from '@/styles/ISee.module.css'

interface ImgurImage {
  id: string;
  link: string;
}

interface ImgurAlbumResponse {
  data: ImgurImage[];
  success: boolean;
  status: number;
}

export async function getStaticProps() {
  const albumHash = process.env.IMGUR_ALBUM_HASH; // Replace with your Imgur album hash
  const clientId =  process.env.IMGUR_CLIENT_ID; // Replace with your Imgur client ID

  if (!albumHash || !clientId) {
    console.error('Imgur album hash or client ID is missing');
    return { props: { images: [] } };
  }

  try {
    const response = await axios.get<ImgurAlbumResponse>(
      `https://api.imgur.com/3/album/${albumHash}/images`,
      {
        headers: {
          Authorization: `Client-ID ${clientId}`
        }
      }
    );

    console.log('Imgur API response:', JSON.stringify(response.data, null, 2));

    if (!response.data || !Array.isArray(response.data.data)) {
      console.error('Unexpected Imgur API response structure');
      return { props: { images: [] } };
    }

    const images = response.data.data.map(img => ({
      id: img.id,
      link: img.link
    }));

    return {
      props: {
        images
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching Imgur album:', error);
    return {
      props: {
        images: []
      }
    };
  }
}

export default function ISee({ images }: { images: ImgurImage[] }) {
  const [page, setPage] = useState(0)
  const photosPerPage = 9
  const currentPhotos = images.slice(page * photosPerPage, (page + 1) * photosPerPage)

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
          {currentPhotos.map((photo) => (
            <div key={photo.id} className={styles.photoWrapper}>
              <Image 
                src={photo.link} 
                alt={`Photo ${photo.id}`} 
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
          {(page + 1) * photosPerPage < images.length && (
            <button onClick={() => setPage(page + 1)} className={styles.navButton}>
              &gt;
            </button>
          )}
        </div>
      </main>
    </div>
  )
}