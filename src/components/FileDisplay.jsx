import React from 'react'

export default function FileDisplay(props) {
    const { audioStream, file, handleFormSubmission, handleAudioReset } = props

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 w-82 max-w-full mx-auto text-center sm:w-96 sm:gap-4 justify-center pb-20'>
            <h1 className='bold font-semibold text-4xl sm:text-5xl text-5xl md:text-6xl'>Your <span className='text-blue-400 bold'>File</span></h1>

            <div className='mx-auto my-4 flex flex-col text-left'>
                <h3 className='font-semibold'>Name</h3>
                <p>{file ? file.name : 'Custom audio'}</p>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <button className='text-slate-400 hover:text-blue-600 duration-200' onClick={handleAudioReset}>Reset</button>
                <button onClick={handleFormSubmission} className='specialBtn flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-blue-400'>
                    <p>Transcribe</p>
                    <i className="fa-solid fa-pen"></i>
                </button>
            </div>
        </main>
    )
}
