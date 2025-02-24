import React, { useState } from 'react'

export default function Information(props) {
    const [tab, setTab] = useState('transcription')

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 max-w-full mx-auto text-center max-w-prose w-full sm:gap-4 justify-center pb-20'>
            <h1 className='bold font-semibold text-4xl sm:text-5xl text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>

            <div className='flex mx-auto bg-white border-solid border-blue-300 shadow rounded-full overflow-hidden items-center gap-2'>
                <button onClick={() => setTab('transcription') } className={'px-4 py-1 font-medium duration-200 ' + (tab === 'transcription' ? 'bg-blue-400 text-white hover:text-gray-100' : 'text-blue-400 hover:text-blue-600')}>Transcription</button>
                <button onClick={() => setTab('translation') } className={'px-4 py-1 font-medium duration-200 ' + (tab === 'translation' ? 'bg-blue-400 text-white hover:text-gray-100' : 'text-blue-400 hover:text-blue-600')}>Translation</button>
            </div>
        </main>
    )
}
