import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
    const [tab, setTab] = useState('transcription')

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 max-w-full mx-auto text-center max-w-prose w-full sm:gap-4 justify-center pb-20'>
            <h1 className='bold font-semibold text-4xl sm:text-5xl text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>

            <div className='grid grid-cols-2 mx-auto bg-white border-solid border-blue-300 shadow rounded-full overflow-hidden items-center'>
                <button onClick={() => setTab('transcription') } className={'px-4 py-1 font-medium duration-200 ' + (tab === 'transcription' ? 'bg-blue-400 text-white hover:text-gray-100' : 'text-blue-400 hover:text-blue-600')}>Transcription</button>
                <button onClick={() => setTab('translation') } className={'px-4 py-1 font-medium duration-200 ' + (tab === 'translation' ? 'bg-blue-400 text-white hover:text-gray-100' : 'text-blue-400 hover:text-blue-600')}>Translation</button>
            </div>

            <div className='my-8'>
                {tab === 'transcription' ? <Transcription {...props} /> : <Translation {...props}/>}
            </div>
            

            <div className='flex item-center gap-4'>
                <button>
                    <i className="fa-solid fa-copy"></i>
                </button>
                <button>
                    <i className="fa-solid fa-download"></i>
                </button>
            </div>
        </main>
    )
}
