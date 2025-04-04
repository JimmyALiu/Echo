import { useEffect, useRef, useState } from 'react'
import FileDisplay from './components/FileDisplay'
import HomePage from './components/HomePage'
import Header from './components/Header'
import Information from './components/Information'
import Transcribing from './components/Transcribing'
import { MessageTypes } from './utils/presets'


function App() {
    const [file, setFile] = useState(null)
    const [audioStream, setAudioStream] = useState(null)
    const [output, setOutput] = useState(null)
    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)

    const isAudioAvailable = file || audioStream

    function handleAudioReset() {
        setFile(null)
        setAudioStream(null)
    }

    const worker = useRef(null)

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), { type: 'module' })
        }

        const onMessageRecieved = async (e) => {
            switch (e.data.type) {
                case 'DOWNLOADING':
                    console.log('DOWNLOADING')
                    break;

                case 'LOADING':
                    setLoading(true)
                    console.log('LOADING')
                    break;

                case 'RESULT':
                    setOutput(e.data.results)
                    console.log(e.data.results)
                    break;

                case 'INFERENCE_DONE':
                    setFinished(true)
                    console.log('INFERENCE_DONE')
                    break;
            }
        }

        worker.current.addEventListener('message', onMessageRecieved)

        // cleanup 
        return () => worker.current.removeEventListener('message', onMessageRecieved)
    })


    async function readAudioFrom(file) {
        const sampling_rate = 16000
        const audioCTX = new AudioContext({ sampleRate: sampling_rate })
        const response = await file.arrayBuffer()
        const decoded = await audioCTX.decodeAudioData(response)
        const audio = decoded.getChannelData(0)
        return audio
    }


    async function handleFormSubmission() {
        if (!file && !audioStream) return

        let audio = await readAudioFrom(file ? file : audioStream)
        const model_name = 'openai/whisper-tiny.en'

        worker.current.postMessage({
            type: MessageTypes.INFERENCE_REQUEST,
            audio,
            model_name
        })
    }

    return (
        <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
            <section className='min-h-screen flex flex-col'>
                <Header />
                {output ? (
                    <Information output={output} finished={finished} />
                ) : loading ? (
                    <Transcribing />
                ) : isAudioAvailable ? (
                    <FileDisplay audioStream={audioStream} file={file} handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} />
                ) : (
                    <HomePage setAudioStream={setAudioStream} setFile={setFile} />
                )}
            </section>
            <footer></footer>
        </div>
    )
}

export default App
