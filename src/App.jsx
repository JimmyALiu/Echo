import { useState, useEffect } from 'react'
import FileDisplay from './components/FileDisplay'
import HomePage from './components/HomePage'
import Header from './components/Header'
import Information from './components/Information'


function App() {
    const [file, setFile] = useState(null)
    const [audioStream, setAudioStream] = useState(null)
    const [output, setOutput] = useState(null)
    const [loading, setLoading] = useState(false)

    const isAudioAvailable = file || audioStream

    function handleAudioReset() {
        setFile(null)
        setAudioStream(null)
    }

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
