import React from "react"
import * as css from "./styles.module.css"
import { rhythm } from "../../utils/typography"
import Card from "../../common/card"
import Pill from "../../common/pill/pill"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function ArticleGrid({ articles }) {
  return (
    <section className={css.article_grid_layout} id="article">
      {articles.map(({ node }) => {
        const tags = node.frontmatter?.tags?.split(",") ?? []
        return (
          <Card key={node.id}>
            <Link className={css.card_link} to={node.fields.slug}>
              {node.frontmatter.image ? (
                <img
                  src={node.frontmatter.image}
                  className={`${css.image} lazyload`}
                  alt={node.title}
                />
              ) : (
                <StaticImage
                  height={150}
                  src="../../images/placeholder.jpg"
                  alt="placeholder unicorn"
                  layout="fullWidth"
                />
              )}
              <div className={css.wrapper}>
                <h5
                  style={{
                    marginBottom: `${rhythm(1 / 4)}`,
                    marginTop: `${rhythm(1 / 3)}`,
                  }}
                >
                  {node.frontmatter.title}{" "}
                </h5>
                <p className={`${css.excerpt} ${css.quote}`}>
                  {node.frontmatter.date}
                </p>
                <p className={css.excerpt}>{node.frontmatter.description}</p>
              </div>
              <div className={css.divider}></div>
              <div className={css.tags}>
                {tags.map((t, i) => {
                  return <Pill key={i} text={t} />
                })}
              </div>
            </Link>
          </Card>
        )
      })}
    </section>
  )
}
