import React from 'react'
import { LANGUAGES } from '../utils/presets'

export default function Translation(props) {
    const { textElement, translation, setTranslation, toLanguage, setToLanguage, translating, setTranslating } = props

    return (
        <div className='flex flex-col gap-2 ,ax-w-[400px w-full mx-auto'>
            <div className='flex items-stretch'>
                <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                    <option value={'Select language'}>Select language</option>
                    {Object.entries(LANGUAGES).map(([key, value]) => {
                        return (
                            <option key={key} value={value}>{key}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
