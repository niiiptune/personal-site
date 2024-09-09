import { ImageLoaderProps } from 'next/image'

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  return `${src}?w=${width}&q=${quality || 75}`
}