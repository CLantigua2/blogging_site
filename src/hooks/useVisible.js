import { useState, useEffect } from "react"

const useVisible = ({ ref }) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    ref.addEventListener("scroll", eventFunc(ref))
    return () => ref.removeEventListener("scroll", eventFunc(ref))
  }, [])

  const eventFunc = el => {
    if (isInViewport(el)) {
      setIsVisible(true)
      return
    }
    setIsVisible(false)
  }
  const isInViewport = el => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  return [isVisible]
}

export default useVisible
