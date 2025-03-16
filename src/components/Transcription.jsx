import React from 'react'

export default function Transcription(props) {
    const { output } = props
    const finalText = output.map(val => val.text)
    console.log(output)
    console.log(typeof output)

    return (
        <div>{output[0].text}</div>
    )
}
