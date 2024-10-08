import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const socialLinks = [
  { name: 'Twitter', url: 'https://x.com/joel_knee', icon: '/icons/twitter.svg' },
  { name: 'YouTube', url: 'https://www.youtube.com/@kevinni68', icon: '/icons/youtube.svg' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/haiwen-ni-5491297/', icon: '/icons/linkedin.svg' },
  { name: 'GitHub', url: 'https://github.com/niiiptune', icon: '/icons/github.svg' },
]

// Replace this URL with the direct link to your Imgur image
const profilePictureUrl = 'https://i.imgur.com/8mohFyM.jpg'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{"Joel Knee's Fantasyland"}</title>
        <meta name="description" content="Personal site of Joel Knee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.profile}>
          <Image
            src={profilePictureUrl}
            alt="Joel Knee"
            width={200}
            height={200}
            className={styles.profileImage}
          />
          <h1 className={styles.name}>Joel Knee</h1>
        </div>

        <div className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Image 
                src={link.icon} 
                alt={link.name} 
                width={24} 
                height={24}
              />
            </a>
          ))}
        </div>

        <div className={styles.sections}>
          <Link href="/i-see" className={styles.sectionLink}>I see</Link>
          <Link href="/i-write" className={styles.sectionLink}>I write</Link>
        </div>
      </main>
    </div>
  )
}