import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

const socialLinks = [
  { name: 'Twitter', url: 'https://x.com/joel_knee', icon: '/icons/twitter.svg' },
  { name: 'YouTube', url: 'https://www.youtube.com/@kevinni68', icon: '/icons/youtube.svg' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/haiwen-ni-5491297/', icon: '/icons/linkedin.svg' },
  { name: 'GitHub', url: 'https://github.com/niiiptune', icon: '/icons/github.svg' },
]

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Joel Knee's Fantasyland</title>
        <meta name="description" content="Personal site of Your Name" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.profile}>
          <img
            src="/images/profile-placeholder.jpg"
            alt="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            width={200}
            height={200}
            className={styles.profileImage}
          />
          <h1 className={styles.name}>Joel Knee</h1>
        </div>

        <div className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <img src={link.icon} alt={link.name} width={24} height={24} />
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}