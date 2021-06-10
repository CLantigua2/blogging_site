import React from "react"
import * as css from "./index.module.css"
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share"

const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div style={{ marginTop: "2em" }}>
      <FacebookShareButton url={url} className={css.react_share__ShareButton}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={title}
        via={twitterHandle}
        hashtags={tags}
      >
        <TwitterIcon
          size={40}
          round={true}
          className={css.react_share__ShareButton}
        />
      </TwitterShareButton>

      <LinkedinShareButton
        url={url}
        className={css.react_share__ShareButton}
        title={title}
      >
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>

      <RedditShareButton
        url={url}
        title={title}
        className={css.react_share__ShareButton}
      >
        <RedditIcon size={40} round={true} />
      </RedditShareButton>

      <WhatsappShareButton
        url={url}
        title={title}
        className={css.react_share__ShareButton}
      >
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
    </div>
  )
}
export default ShareButtons
