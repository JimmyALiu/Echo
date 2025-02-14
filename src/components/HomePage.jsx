import React, { useState, useEffect, useRef } from 'react'

export default function HomePage(props) {
    const { setAudioStream, setFile } = props

    const [recordingState, setRecordingState] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)  // useref used is a current object that does not trigger a re-render
    const mimeType = 'audio/webm'  // audio file type

    async function startRecording() {
        let tempStream

        console.log("Recording started")

        try {
            // navigator is a global instance of the Navigator interface
            // .mediaDevices returns an instance of the MediaDevices object
            // .getUserMedia prompts the user for permissions. It returns a promise, hence the async function
            const streamData = navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })

            // whent he promise is resolved we store the resulting media stream object into tempStream
            tempStream = streamData

        } catch(err) {
            console.log(err)
            return
        }
        
        // we pass in the media stream object along with the type of file
        const media = new MediaRecorder(tempStream, { type: mimeType })
        
        // store it into the useRef hook
        mediaRecorder.current = media
        mediaRecorder.current.start()  // being recording user
        
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') return
            if (event.data.size === 0) return
            localAudioChunks.push(event.data)
        }
        setAudioChunks(localAudioChunks)
    }
    
    return (
        <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20'>
            <h1 className='text-blue-400 bold font-semibold text-5xl sm: text-6xl md:text-7xl'>Echo</h1>
            <h3 className='font-medium md:text-lg'>
                Record <span 
                className='text-blue-400'>&rarr;</span> Transcribe <span 
                className='text-blue-400'>&rarr;</span> Translate 
            </h3>
            <button className='flex items-center text-base justify-between gap-4 mx-auto w-80 max-w-full my-full px-4 py-2 rounded-xl specialBtn'>
                <p className='text-blue-400'>Record</p>
                <i className="fa-solid fa-microphone"></i>
            </button>
            <p>
                Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'> upload <input onChange={(e) => {
                    const tempFile = e.target.files[0]
                    setFile(tempFile)
                }} className='hidden' type='file' accept='.mp3,.wave' /> a mp3 file</label>
            </p>
            <p className='italic text-slate-400'>100% free and open source</p>
        </main>
    )
}
