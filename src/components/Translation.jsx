import React from 'react'

export default function Translation(props) {
    const { output } = props
    const finalText = output.map(val => val.text)

    return (
        <div>{finalText}</div>
    )
}
