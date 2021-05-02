import React from "react"
import Layout from "../common/layout"
import { graphql, Link } from "gatsby"
import Card from "../common/card"
import CardContent from "../common/card-content/card-content"
import SEO from "../components/SEO"
import Input from "../common/input"
import Textarea from "../common/textarea/textarea"
import Button from "../common/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Home({ data }) {
  return (
    <>
      <SEO />
      <Layout>
        <div>
          <Card>
            <CardContent>
              <h1 className="header">Contact Me</h1>
              <p>Would you like to get a hold of me?</p>
              <p>
                For the quickest way to contact me, message me on LinkedIn or
                Twitter.
              </p>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Link
                  to="https://www.linkedin.com/in/carlos-lantigua/"
                  style={{
                    backgroundImage: "none",
                    margin: "1em",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    style={{ width: 50, height: 50, color: "#0C66C2" }}
                  />
                </Link>
                <Link
                  to="https://twitter.com/CodeLantigua"
                  style={{ backgroundImage: "none" }}
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ width: 50, height: 50, color: "#1DA1F1" }}
                  />
                </Link>
              </div>
              <form
                method="post"
                action="https://getform.io/f/48bce711-7d99-4810-b504-dab9843ba9ea"
                enctype="multipart/form-data"
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  }}
                >
                  <Input
                    label="Subject"
                    type="subject"
                    name="subject"
                    id="subject"
                  />
                  <Input label="Name" type="text" name="name" id="name" />
                  <Input label="Email" type="email" name="email" id="email" />
                </div>
                <Textarea
                  label="Message"
                  name="message"
                  id="message"
                  rows="5"
                />
                <Input label="Upload a file" type="file" name="file" />
                <Button variant="button" type="submit" value="Send" />
                <Button variant="input" type="reset" value="Clear" />
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
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
          excerpt
        }
      }
    }
  }
`
