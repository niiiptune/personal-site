export default function imageLoader({ src, width, quality }) {
  const prefix = process.env.NODE_ENV === 'production' ? '/personal-site' : ''
  return `${prefix}${src}?w=${width}&q=${quality || 75}`
}