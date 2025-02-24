import React from 'react'

export default function Information() {
    return (
        <main className='flex-1 p-4 flex flex-col gap-3 max-w-full mx-auto text-center max-w-prose w-full sm:gap-4 justify-center pb-20'>
            <h1 className='bold font-semibold text-4xl sm:text-5xl text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>

            <div className='flex mx-auto bg-white border-2 border-solid border-blue-300 shadow rounded-full overflow-hidden items-center gap-2'>
                <button className='px-4 py-1 font-medium '>Transcription</button>
                <button className='px-4 py-1 font-medium '>Translation</button>
            </div>
        </main>
    )
}
