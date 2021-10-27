import React, { useEffect, useContext } from "react"
import ListLink from "../../components/listlink"
import Link from "next/link"
import Image from "next/image"
// TODO: remove gatsby imports
// import { useStaticQuery, graphql } from "gatsby"
import * as css from "./index.module.css"
import ScrollContext from "../../context/scrollContext"
import DarkToggle from "../dark-toggle/dark-toggle"
import Pill from "../pill"
import Overlay from "../overlay"
import { PageTransition } from "../../common/spring-animation"
// import Resume from "../../media/Carlos Lantigua New Resume.pdf"
import Footer from "../../components/footer"
import headCrop from "../../images/Carlos-Lantigua-headcrop-small.jpg"

const Layout = React.forwardRef(({ children, tags }, ref) => {
  const [scrollTo, setScrollTo] = useContext(ScrollContext)

  useEffect(() => {
    const timer = () => setTimeout(() => setScrollTo(null), 2000)
    const isBroswer = typeof window !== undefined
    if (scrollTo && isBroswer) {
      const element = document.getElementById(scrollTo)
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop,
      })
      timer()
    }
    return () => clearTimeout(timer)
  }, [scrollTo, setScrollTo])

  useEffect(() => {
    // stop speechsynth on page load
    const isBroswer = typeof window !== undefined
    if (isBroswer) {
      speechSynthesis.cancel()
    }
  }, [])

  // const data = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `
  // )

  const loadPdfPage = () => {
    const file = new Blob([Resume], { type: "application/pdf" })
    const fileUrl = URL.createObjectURL(file)
    const pdfWindow = window.open()
    pdfWindow.location.href = fileUrl
  }

  return (
    <div className={css.content_separator}>
      <div className={css.layout_container}>
        <div className={css.left_side}>
          <div className={css.left_wrapper}>
            <div className={css.left_side_image_container}>
              <Image
                src={headCrop}
                alt="Carlos Lantigua"
                width={75}
                height={80}
                layout="fixed"
                placeholder="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "65% 75%",
                  filter: "grayscale(1)",
                  objectFit: "cover",
                }}
                className={css.avatar}
              />
            </div>
            <header className={css.layout_header}>
              <Link href="/" className={css.layout_title_link}>
                <a>
                  <h3 className={css.layout_title} aria-live="assertive">
                    {/* {data.site.siteMetadata.title} */}
                    fake data FIXME:
                  </h3>
                </a>
              </Link>
              <ul className={`link_list ${css.desktopOnly} `}>
                <ListLink href="/">
                  <a>Home</a>
                </ListLink>
                <ListLink href="/about/">
                  <a>About</a>
                </ListLink>
                <li>
                  <a
                    onClick={() => loadPdfPage()}
                    // href={Resume}
                    without
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </li>
                <ListLink href="/contact/">
                  <a>Contact</a>
                </ListLink>
                <ListLink href="/bored/">
                  <a>Bored</a>
                </ListLink>
              </ul>
            </header>
            <div className={css.mobileOnly}>
              <DarkToggle />
            </div>
            <div className={css.mobileOnly}>
              <Overlay />
            </div>
          </div>
        </div>

        <div className={css.content} ref={ref}>
          <PageTransition>{children}</PageTransition>
        </div>
        <div
          className={`${css.panel_container} ${css.desktopOnly}`}
          style={{ width: tags ? "14%" : "7%" }}
        >
          <div className={css.pill_container}>
            <DarkToggle />
            {tags ? (
              <>
                <h3 className={css.tag_title}>Tags</h3>
                <br />
                {tags?.split(",").map((t, i) => {
                  return <Pill key={i} text={t} />
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
})

export default Layout
