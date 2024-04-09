export const readingTime = (text: string) => {
  const wpm = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}
