import React from "react"
import Layout from "../common/layout"
import Card from "../common/card"
import CardContent from "../common/card-content/card-content"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import Image from "next/image"
import { useDimensions } from "../hooks/use-dimensions"

export default function Bored({ data }) {
  const ref = React.useRef(null)
  const images = data.allFile.nodes.map(node => ({
    ...node.childImageSharp, // Note that we're spreading the childImageSharp object here
    id: node.id,
  }))

  const zoomImage = e => {
    console.log(e.target)
    e.target.style.overflow = "visible"
    e.target.style.transform = "scale(2)"
  }
  const { width } = useDimensions(ref)
  return (
    <>
      <Seo />
      <Layout ref={ref}>
        <CardContent>
          <Card padding="small">
            <div ref={ref}>
              <h1>Thanks for checking out my site</h1>
              {width > 800 ? (
                <>
                  <p>Here's a flappy birds clone I made in Phaser3.</p>
                  <div
                    style={{ width: 800, height: 600 }}
                    dangerouslySetInnerHTML={{
                      __html: `<iframe
              src='https://naughty-albattani-2a9041.netlify.app'
              title='flappy bird clone'
              allow-scripts={true}
              styles={height='800px'
              width='800px'}
              height='600px'
              width='800px'
            />`,
                    }}
                  ></div>
                </>
              ) : (
                <p>Whoops, looks like you need a bigger screen to play this.</p>
              )}
              <br />
              <p>
                At one point in my life, I REALLY wanted to work in video games.
                I grew up on them from the Atari, turbo graphix 16, even playing
                games on DOS. My brother and I would spend all day playing games
                like Street Fight II (well, I spent all day losing) and Mario
                Kart. I used to draw all of the video game characters and buy
                every gaming magazine that I could find. Looking back, I
                probably should have paid more attention in school but I was
                having a lot fun being able to be in my own little world. I grew
                up in some really bad neighborhoods so it wasn't always easy
                going outside to play or even just walk around when we wanted
                to. So video games helped me escape and be the hero of some
                awesome stories. At one point I did go to school for video game
                design. I enjoyed the worlds in video games more than anything
                else and wanted to try my hand at that. I ended up having to
                drop out because the hours between school and my Marine duties
                kept clashing. I was getting 3 hours of sleep every day then
                crashing on the weekends and waking up with anxiety because I
                thought I had something due even when I didn't haha.
              </p>
              <p>
                I'm slowly getting back into it as a hobby and exploring
                different approaches to creating video games for fun. I don't
                really have a passion for it like I did back then but it's
                something that I enjoy digging into. I made this flappy bird
                game as something to show my 6 year old (at the time of this
                writing) daughter the kind of cool things you can build with
                code. Every time she sees me on the laptop she gets so curious
                about what I'm writing and I would love to help her continute
                that curiousity. She's recently been playing a lot of Roblox
                lately. After noticing that she purchased about $20 worth of
                Roblox coins, I decided to grant her an account with all of the
                parental restrictions it can handle haha. Today's games seem to
                be riddled with ways to squeeze out every penny from kids vs
                when I grew up. The market has changed a lot thanks to the
                internet, for both good and bad. I hope to see her grow up enjoy
                video games the same way that I did while hopefully not being as
                bad at school as I was haha.
              </p>

              <div className="gallery">
                {images.map(({ id, fluid }) => (
                  <Image key={id} fluid={fluid} onClick={e => zoomImage(e)} />
                ))}
              </div>
            </div>
          </Card>
        </CardContent>
      </Layout>
    </>
  )
}

// export const query = graphql`
//   query MyQuery {
//     allFile(
//       filter: {
//         extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
//         absolutePath: { regex: "/images/art/" }
//       }
//     ) {
//       nodes {
//         id
//         childImageSharp {
//           fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   }
// `
