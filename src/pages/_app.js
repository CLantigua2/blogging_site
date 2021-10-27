import { ThemeProvider } from "../context/darkModeContext"
import "../styles/global.css"

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="app">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}

export default App
