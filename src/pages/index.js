import React, { useState } from "react"
import Layout from "../common/layout"
import { graphql } from "gatsby"
import ArticleGrid from "../components/article-grid"
import ScrollContext from "../context/scrollContext"
import Card from "../common/card"
import CardContent from "../common/card-content/card-content"
import SEO from "../components/SEO"

export default function Home({ data }) {
  const [scrollTo, setScrollTo] = useState(null)

  return (
    <>
      <SEO />
      <ScrollContext.Provider value={[scrollTo, setScrollTo]}>
        <Layout>
          <div>
            <Card>
              <CardContent>
                <h1 className="header">
                  Welcome{" "}
                  <span role="img" aria-label="waving hand">
                    👋🏽
                  </span>
                </h1>
                <p>
                  I'm Full Stack developer who loves adventuring into different
                  kinds of technologies. I often do "spikes" or research and
                  build quick proof of concept apps using different technologies
                  and provide write ups on my thoughts. This helps our teams
                  make a quick and informed decision that allows us to move
                  forward with confidence. I have a good (or bad) habit of
                  recording a lot of the stuff I explore and turning it into
                  blogs for others to enjoy. Most of my Articles can be found on
                  Medium or other sites. I'll be consolidating it all here to
                  make it easier to find.
                </p>
              </CardContent>
            </Card>

            <h4 id="article">{data.allMarkdownRemark.totalCount} Posts</h4>
            <ArticleGrid articles={data.allMarkdownRemark.edges} />
          </div>
        </Layout>
      </ScrollContext.Provider>
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            image
            title
            description
            tags
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 30)
        }
      }
    }
  }
`
