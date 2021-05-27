import _ from "lodash"

export default class SpeechSynth {
  constructor() {
    this.utterance = new SpeechSynthesisUtterance()
    this.timer = ms =>
      new Promise(res => {
        console.log("WAITING...", res)
        setTimeout(res, ms)
      })
  }

  static supported(selected) {
    return window.speechSynthesis
  }

  getVoice(selected = 1) {
    const voice = window.speechSynthesis.getVoices()
    return voice[selected]
  }

  loadProps(props) {
    this.utterance.voice = this.getVoice(props.voice)
    this.utterance.text = this._formatText(props.text)
    this.utterance.lang = props.lang || "en-US"
    this.utterance.pitch = parseFloat(props.pitch, 10) || 0.8
    this.utterance.rate = parseFloat(props.rate, 10) || 1
    this.utterance.volume = parseFloat(props.volume, 10) || 1
  }

  onend(func) {
    this.utterance.onend = func
  }

  onerror(func) {
    this.utterance.onerror = func
  }

  _formatText(text) {
    const formatText = this._stripHtml(text)
      .replaceAll("/<[^>]|[^<]*>|/`[^`]*`?/gm,", "")
      .trim()
      .split("\n")
    return formatText
  }

  async speak() {
    const format = this.utterance.text
    const partitions = this._partitionText(format, 150)
    let utterCopy = _.cloneDeep(this.utterance)
    console.log("OUTSIDE")
    for (let i = 0; i < partitions.length; i++) {
      console.log("INSIDE")
      let current = new SpeechSynthesisUtterance(utterCopy)
      current.text = partitions[i]
      console.log(current)
      window.speechSynthesis.speak(current)
      await new Promise(res =>
        setTimeout(() => {
          window.speechSynthesis.cancel()
          console.log("done")
          // TODO: need to find a better to partition text
          // TODO: need a more dynamic way to present the delay time
          res()
        }, 9500)
      ).then()
    }
  }

  pause() {
    window.speechSynthesis.pause()
  }

  cancel() {
    window.speechSynthesis.cancel()
  }

  resume() {
    window.speechSynthesis.resume()
  }

  _stripHtml(html) {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  _isOverflow(text, textArr, limit) {
    let temp = [textArr, text]
    const joinedText = temp.join(" ")
    for (let i = 0; i < joinedText.length; i++) {
      if (i > limit) {
        return true
      }
    }
    return false
  }

  _splitText(text, char_limit = 300, store = []) {
    const current_readable_text = []
    for (let i = 0; i < text.length; i++) {
      if (!this._isOverflow(text[i], current_readable_text, char_limit)) {
        current_readable_text.push(text[i])
      } else {
        store.push(current_readable_text.join(" "))
        const newText = text.slice(i + 1)
        return this._splitText(newText, char_limit, store)
      }
    }
    return store
  }

  _partitionText(text, char_limit) {
    const partions = text.split(" ")
    return this._splitText(partions, char_limit)
  }
}
