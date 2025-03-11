import { useEffect, useRef, useState } from 'react'
import FileDisplay from './components/FileDisplay'
import HomePage from './components/HomePage'
import Header from './components/Header'
import Information from './components/Information'


function App() {
    const [file, setFile] = useState(null)
    const [audioStream, setAudioStream] = useState(null)
    const [output, setOutput] = useState(null)
    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [downloading, setDownloading] = useState(false)

    const isAudioAvailable = file || audioStream

    function handleAudioReset() {
        setFile(null)
        setAudioStream(null)
    }

    const worker = useRef(null)

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {type: 'module'})
        }

        const onMessageRecieved = async (e) => {
            switch (e.data.type) {
                case 'DOWNLOADING':
                    setDownloading(true)
                    console.log('DOWNLOADING')
                    break;

                case 'LOADING':
                    setLoading(true)
                    console.log('LOADING')
                    break;

                case 'RESULT':
                    setOutput(e.data.results)
                    console.log('RESULT')
                    break;

                case 'INFERENCE_DONE':
                    setFinished(true)
                    console.log('INFERENCE_DONE')
                    break;
            }
        }
    }, [])

    return (
        <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
            <section className='min-h-screen flex flex-col'>
                <Header />
                {output ? (
                    <Information />
                ) : loading ? (
                    <Transcribing />
                ) : isAudioAvailable ? (
                    <FileDisplay audioStream={audioStream} file={file} handleAudioReset={handleAudioReset} />
                ) : (
                    <HomePage setAudioStream={setAudioStream} setFile={setFile} />
                )}
            </section>
            <footer></footer>
        </div>
    )
}

export default App
