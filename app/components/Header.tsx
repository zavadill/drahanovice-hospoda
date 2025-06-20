import React from 'react'
import CustomHeaderButtons from './CustomHeaderButtons'

const Header = () => {
  return (
    <div className='min-h-screen flex items-center justify-cente0r bg-cover bg-center bg-no-repeat relative bg-[url("/images/header-pozadi.jpg")]'>
        <header className='width-page text-center space-y-5 text-[var(--white)]'>
            <h1 className='text-4xl md:text-7xl font-bold'>Hostinec na Nové</h1>
            <p className='text-xl md:text-2xl'>Rodinná česká kuchyně v srdci Hané od roku 1762</p>
            <div className='flex flex-row space-x-5 justify-center'>
                <CustomHeaderButtons 
                    title='Prohlédnout menu'
                    href='/menu'
                    containerStyles='green-btn'
                />
                <CustomHeaderButtons 
                    title='Kde nás najdete'
                    href='/kontakt'
                    containerStyles='white-btn'
                />
                
            </div>
        </header>
    </div>
  )
}

export default Header
