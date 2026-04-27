import { useState, useEffect } from 'react'

export default function useTyped(words, speed = 120, pause = 2000) {
  const [text, setText] = useState('')
  const [wIdx, setWIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const cur = words[wIdx]
    let t
    if (!deleting && charIdx < cur.length) {
      t = setTimeout(() => { setText(cur.slice(0, charIdx + 1)); setCharIdx(c => c + 1) }, speed)
    } else if (!deleting && charIdx === cur.length) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { setText(cur.slice(0, charIdx - 1)); setCharIdx(c => c - 1) }, speed / 2)
    } else {
      setDeleting(false)
      setWIdx(i => (i + 1) % words.length)
    }
    return () => clearTimeout(t)
  }, [charIdx, deleting, wIdx, words, speed, pause])

  return text
}
