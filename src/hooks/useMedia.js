import { useEffect, useState } from "react"

export default function useMedia(queries, values, defaultValues) {
  const match = () =>
    values[queries.findInde(q => matchMedia(q).matches)] || defaultValues
  const [value, setValue] = useState(match)
  useEffect(() => {
    const handler = () => setValue(match)
    if (typeof window !== undefined) {
      window.addEventListener("resize", handler)
      return () => window.removeEventListener(handler)
    }
  }, [])
  return value
}
