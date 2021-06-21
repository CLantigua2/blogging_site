const synth = window.speechSynthesis
const pitch = 1
const rate = 1

// get all voices from speechsynth
function populateVoiceList() {
  const voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase()
    const bname = b.name.toUpperCase()
    if (aname < bname) return -1
    else if (aname === bname) return 0
    else return +1
  })
  return voices
}

// the func that will be called
export function speak(textToRead, onEndCallback) {
  const voices = populateVoiceList()
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList
  }

  if (synth.speaking) {
    console.error("speechSynthesis.speaking")
    return
  }
  if (textToRead !== "") {
    const utterThis = new SpeechSynthesisUtterance(textToRead)
    utterThis.onend = function (event) {
      onEndCallback("_play")
    }
    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror")
    }
    utterThis.voice = voices[0]
    utterThis.pitch = pitch
    utterThis.rate = rate
    synth.speak(utterThis)
  }
}
