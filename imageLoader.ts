import { ImageLoaderProps } from 'next/image'

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const prefix = process.env.NODE_ENV === 'production' ? '/personal-site' : ''
  return `${prefix}${src}?w=${width}&q=${quality || 75}`
}