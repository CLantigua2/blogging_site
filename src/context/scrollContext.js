import { createContext } from "react"

const ScrollContext = createContext({
  scrollTo: null,
  setScrollTo: () => {},
})

export default ScrollContext
