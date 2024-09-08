import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/photos">Photos</Link>
      </nav>
      <main>{children}</main>
    </>
  )
}