import React, { useState, useEffect, useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
    const { output } = props
    const [tab, setTab] = useState('transcription')
    const [translation, setTranslation] = useState(null)
    const [translating, setTranslating] = useState(null)
    const [toLanguage, setToLanguage] = useState('Select language')

    const worker = useRef()

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('./utils/translation.worker.js', import.meta.url), { type: 'module' })
        }

        const onMessageRecieved = async (e) => {
            switch (e.data.status) {
                case 'initiate':
                    console.log('initiate')
                    break;

                case 'progress':
                    console.log('progress')
                    break;

                case 'update':
                    setTranslation(e.data.results)
                    console.log(e.data.results)
                    break;

                case 'complete':
                    setTranslating(false)
                    console.log('ready')
                    break;
            }
        }

        worker.current.addEventListener('message', onMessageRecieved)

        // cleanup 
        return () => worker.current.removeEventListener('message', onMessageRecieved)
    })

    function handleCopy() {
        navigator.clipboard.writeText(textElement)
    }

    function handleDownload() {
        const element = document.createElement('a')
        const file = new Blob([textElement], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download(`Echo_${(new Date()).toDateString()}.txt`)
        document.body.appendChild(element)
        element.click()
    }

    function generateTranslation() {
        if (translating || toLanguage === 'Select language') return
        
        setTranslating(true)

        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        })
    }

    const textElement = tab === 'transcription' ? output.map(val => val.text) : ''

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 max-w-full mx-auto text-center max-w-prose w-full sm:gap-6 justify-center pb-20'>
            <h1 className='bold font-semibold text-4xl sm:text-5xl text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>

            <div className='grid grid-cols-2 mx-auto bg-white border-solid border-blue-300 shadow rounded-full overflow-hidden items-center'>
                <button onClick={() => setTab('transcription')} className={'px-4 py-1 font-medium duration-200 cursor-pointer ' + (tab === 'transcription' ? 'bg-blue-400 text-white hover:text-gray-100' : 'text-blue-400 hover:text-blue-600')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 py-1 font-medium duration-200 cursor-pointer ' + (tab === 'translation' ? 'bg-blue-400 text-white hover:text-gray-100' : 'text-blue-400 hover:text-blue-600')}>Translation</button>
            </div>

            <div className='my-6'>
                {(!finished || translating) && (
                    <div className='grid place-items-center'>
                        <i className='fa-solid fa-spinner animate-spin'></i>
                    </div>
                )}
                {
                    tab === 'transcription' ? 
                    <Transcription {...props} textElement={textElement} /> : 
                    <Translation {...props} textElement={textElement} toLanguage={toLanguage} setToLanguage={setToLanguage} translating={translating} generateTranslation={generateTranslation} />
                }
            </div>


            <div className='flex items-center gap-4 mx-auto'>
                <button title='Copy' className='max-w-[50px] aspect-square p-2 px-4 rounded-[8px] bg-white text-blue-300 hover:text-blue-400 duration-200 cursor-pointer'>
                    <i className="fa-solid fa-copy"></i>
                </button>
                <button title='Download' className='max-w-[50px] aspect-square p-2 px-4 rounded-[8px] bg-white text-blue-300 hover:text-blue-400 duration-200 cursor-pointer'>
                    <i className="fa-solid fa-download"></i>
                </button>
            </div>
        </main>
    )
}
