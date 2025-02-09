import React from 'react'

export default function Header() {
    return (
        <header className='flex items-center justify-between p-4 gap-4'>
            <h1 className='text-blue-400 bold font-medium text-xl'>Echo</h1>
            <button className='flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400'>
                <p>New</p>
                <i className="fa-solid fa-circle-plus"></i>
            </button>
        </header>
    )
}
