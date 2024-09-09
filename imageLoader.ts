import { ImageLoaderProps } from 'next/image'

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const prefix = process.env.NODE_ENV === 'production' ? '/personal-site' : ''
  const fullSrc = src.startsWith('/') ? `${prefix}${src}` : src
  return `${fullSrc}${fullSrc.includes('?') ? '&' : '?'}w=${width}&q=${quality || 75}`
}