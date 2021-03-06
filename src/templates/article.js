import React, { useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../common/layout"
import * as css from "./styles.module.css"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"
import Card from "../common/card"
import Seo from "../components/seo"
import ReadProgress from "../components/read-progress/read-progress"
import { useDimensions } from "../hooks/use-dimensions"
// import Reader from "../components/reader"
import ShareButtons from "../components/share-buttons"
import Reader from "../common/reader/reader"

export default function Article({ data, location }) {
  const parentRef = useRef(null)
  const { width } = useDimensions(parentRef)

  const post = data.markdownRemark
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: post.fields.slug, title: post.frontmatter.title },
  }
  const title = `Read ${post.frontmatter.title} `
  const tags = post.frontmatter.tags.split(",").map(tag => tag.trim())
  const url = location.href
  const description = post.frontmatter.description
  const image = post.frontmatter.image
  const twitterHandle = "CodeLantigua"

  const formatTimeToRead = time => {
    let result = `${time} min`
    if (time > 1) {
      result += "s"
    }
    return result
  }

  return (
    <>
      <Seo
        title={title}
        description={description}
        image={image}
        article={true}
      />
      <Layout tags={post.frontmatter.tags} ref={parentRef}>
        <Card>
          <ReadProgress parentWidth={width} />
          <section className={css.article_section}>
            <div className={css.sharebuttons}>
              <ShareButtons
                title={title}
                url={url}
                twitterHandle={twitterHandle}
                tags={tags}
              />
            </div>
            <h1>{post.frontmatter.title}</h1>
            <div className={css.sub_header}>
              <p>Read Time: {formatTimeToRead(post.timeToRead)}</p>
              <p>Posted {post.frontmatter.date}</p>
            </div>
            <div className={css.reader_wrapper}>
              <Reader textToRead={post.html} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </section>
          <section className={css.article_section}>
            <CommentCount config={disqusConfig} placeholder={"..."} />
            <Disqus config={disqusConfig} />
          </section>
        </Card>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        image
        description
        title
        tags
        readDuration
        date(formatString: "DD MMMM, YYYY")
      }
      rawMarkdownBody
    }
  }
`
