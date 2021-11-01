import React, { useContext } from "react";
import * as css from "./listlink.module.css";
import ScrollContext from "../../context/scroll";
import Link from "next/link";

const ListLink = ({
  to,
  isMenuOpen,
  toggle,
  scrollButton,
  scrollTo,
  children,
}) => {
  const [, setScrollTo] = useContext(ScrollContext);
  return (
    <li>
      <Link
        href={to}
        onClick={(e) => {
          if (isMenuOpen !== undefined && isMenuOpen === true) {
            toggle(false);
          }
          const isBroswer = typeof window !== undefined;
          if (isBroswer && window.location.pathname === "/") {
            if (scrollButton) {
              e.preventDefault();
              setScrollTo(scrollTo);
            }
          }
          return;
        }}
      >
        <a>{children}</a>
      </Link>
    </li>
  );
};

export default ListLink;
