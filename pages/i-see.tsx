import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import styles from '@/styles/ISee.module.css'
import { useInView } from 'react-intersection-observer';

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
  const albumHash = process.env.IMGUR_ALBUM_HASH;
  const clientId = process.env.IMGUR_CLIENT_ID;

  console.log('Album Hash:', albumHash);
  console.log('Client ID:', clientId);

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

    // Remove this line to stop logging the API response
    // console.log('Imgur API response:', JSON.stringify(response.data, null, 2));

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const photosPerPage = 9
  const currentPhotos = images.slice(page * photosPerPage, (page + 1) * photosPerPage)

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [])

  const handleImageClick = (link: string) => {
    setSelectedImage(link)
  }

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

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
        <div ref={ref} className={styles.photoGridContainer}>
          {inView && (
            <div className={styles.photoGrid}>
              {currentPhotos.map((photo, index) => (
                <div key={photo.id} className={styles.photoWrapper} onClick={() => handleImageClick(photo.link)}>
                  <Image 
                    src={photo.link} 
                    alt={`Photo ${photo.id}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(200, 200))}`}
                    priority={index < 4} // Load first 4 images with priority
                  />
                </div>
              ))}
            </div>
          )}
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

      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <button className={styles.closeButton} onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}>X</button>
          <div className={styles.modalImageContainer}>
            <Image
              src={selectedImage}
              alt="Full size image"
              fill
              style={{ objectFit: 'contain' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)