import React from "react"
import Layout from "../common/layout"
import Card from "../common/card"
import ParallaxImage from "../components/parallax-image"
import CardContent from "../common/card-content/card-content"
import PropgressBar from "../common/progress-bar"
import { skills } from "../constants/"
import VisibilitySensor from "react-visibility-sensor"
import Seo from "../components/seo"

export default function About({ data }) {
  return (
    <>
      <Seo />
      <Layout>
        <Card>
          <CardContent>
            <ParallaxImage />
            <h1>About {data.site.siteMetadata.title}</h1>
            <p>
              Hi, I'm a Full Stack Developer currently working at{" "}
              <a
                href="https://www.singlestoneconsulting.com/"
                target="__blank"
                rel="noresender"
              >
                SingleStone Consulting
              </a>{" "}
              in Richmond, VA. I enjoy building robust user experiences with a
              mindfulness for accessibility. I like to write articles about
              tough problems I've solved and cool techy things I explore.
            </p>

            <h3>My Journey So Far</h3>
            <p>
              While I've always loved technology, I wasn't always a developer{" "}
              <span role="img" aria-label="surprised">
                😲
              </span>
              . At one point I was a US Marine and then a QA inspector for an
              air plane manufacturing company ✈️. I began to self study
              programming in mid 2018 before attending Lambda School (a 9 month
              long coding school) in 2019. The school was intense{" "}
              <span role="img" aria-label="sweating">
                😓
              </span>{" "}
              to say the least. Learned a lot of the basics for Full Stack Web,
              but there was still more to learn. After graduating I continued to
              build things and research every day. Eventually, I began working
              at SingleStone Consulting as a FullStack Developer. I've been
              fortunate to work with companies like VCU school of nursing,
              Andiron, and Capital One (on project #3 with them currently).
            </p>
            <p>
              On my own time I volunteer to mentor students on my free time as
              well as explore fun technologies that catch my eyes. I actually
              have a list of technologies I'm interested in that I plan to some
              day get through.
            </p>
            <h3>
              List Of technologies that I plan to get through some day{" "}
              <span role="img" aria-label="nervous smile">
                😅
              </span>
            </h3>
            <p>In no particular order</p>
            <ul style={{ display: "block" }}>
              <li>Django</li>
              <li>VR with Unity</li>
              <li>iOS development</li>
              <li>
                Rasberry Pi (I have one sitting here waiting for me{" "}
                <span role="img" aria-label="eyes">
                  👀
                </span>
                )
              </li>
              <li>c++</li>
              <li>Rust</li>
              <li>Go</li>
              <li>facial recognition technology</li>
              <li>
                AWS (working on my certs{" "}
                <span role="img" aria-label="flex muscle">
                  💪🏽
                </span>
                )
              </li>
            </ul>

            <h3>Open Source Contributions</h3>
            <ul>
              <li>Prisma</li>
              <li>Electron-react-boilerplate</li>
            </ul>

            <h3>Awards and Accomplishments</h3>
            <ul>
              <li>Capital One hackathon innovation award</li>
              <li>Top 3 of most read articles for Single Stone</li>
            </ul>

            <h3>List of Technologies I've worked with or have used</h3>
            <ul>
              {skills.map(skill => {
                return (
                  <VisibilitySensor key={skill.name}>
                    {({ isVisible }) => (
                      <ul
                        className={` ${
                          isVisible ? "animate_element" : "animate_exit"
                        }`}
                      >
                        <li className="no_ball">{skill.name}</li>
                        <PropgressBar value={skill.value} />
                      </ul>
                    )}
                  </VisibilitySensor>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      </Layout>
    </>
  )
}

// export const query = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
