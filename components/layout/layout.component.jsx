import React, { useEffect, useContext } from 'react';
import * as css from './layout.module.css';
import ListLink from '../listlink';
import Image from 'next/image';
import Link from 'next/link';
import ScrollContext from '../../context/scroll';
import ColorToggle from '../color-toggle';
import Overlay from '../overlay';
import PageTransition from '../page-transition';
import Footer from '../footer';

const Layout = React.forwardRef(({ children, tags }, ref) => {
  const [scrollTo, setScrollTo] = useContext(ScrollContext);

  useEffect(() => {
    const timer = setTimeout(() => setScrollTo(null), 2000);
    const isBrowser = typeof window !== undefined;
    if (scrollTo && isBrowser) {
      const element = document.getElementById(scrollTo);
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop,
      });
    }
    return () => clearTimeout(timer);
  }, [scrollTo, setScrollTo]);

  useEffect(() => {
    const isBrowser = typeof window !== undefined;
    if (isBrowser) {
      speechSynthesis.cancel();
    }
  }, []);

  return (
    <div className={css.content_separator}>
      <div className={css.layout_container}>
        <div className={css.left_side}>
          <div className={css.left_wrapper}>
            <div className={css.left_side_image_container}>
              <Image
                src="/../../images/Carlos-Lantigua-headcrop-small.jpg"
                alt="Carlos Lantigua"
                width={75}
                height={80}
                layout="fixed"
                placeholder="avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '65% 75%',
                  filter: 'grayscale(1)',
                  objectFit: 'cover',
                }}
                className={css.avatar}
              />
            </div>
            {/* <header className={css.layout_header}>
              <Link href="/" className={css.layout_title_link}>
                <h3 className={css.layout_title} aria-live="assertive">
                  {data.site.siteMetadata.title}
                </h3>
              </Link>
              <ul className={`link_list ${css.desktopOnly} `}>
                <ListLink to="/">Home</ListLink>
                <ListLink to="/about/">About</ListLink>
                <li>
                  <a
                    href={Resume}
                    without
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </li>
                <ListLink to="/contact/">Contact</ListLink>
                <ListLink to="/bored/">Bored</ListLink>
              </ul>
            </header> */}
            <div className={css.mobileOnly}>
              <ColorToggle />
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
          style={{ width: tags ? '14%' : '7%' }}
        >
          <div className={css.pill_container}>
            <ColorToggle />
            {tags ? (
              <>
                <h3 className={css.tag_title}>Tags</h3>
                <br />
                {tags?.split(',').map((t, i) => {
                  return <Pill key={i} text={t} />;
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
});

export default Layout;
