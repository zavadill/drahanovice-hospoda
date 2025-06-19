import React from 'react'
import CustomHeaderButtons from './CustomHeaderButtons'

const vitejte = () => {
  return (
    <div>
      <div className='width-p-page'>
        <div className='center-text pb-20'>
            <h2 className='text-nadpis'>Vítejte v Hostinci na Nové</h2>
            <p className='text-podnadpis'>Rodinná česká restaurace s bohatou historií od roku 1762</p>
        </div>
        <div className=''>
            <div className='space-y-5'>
              <p>Hostinec Na Nové je tradiční česká restaurace s bohatou historií sahající až do roku 1762. Nacházíme se v krásném prostředí Hané, v obci Drahanovice, kde nabízíme útulné prostředí, výbornou domácí kuchyni a příjemnou atmosféru.</p>
              <p>Náš hostinec se pyšní nejen svou dlouholetou tradicí, ale také rozmanitými prostory, které jsou vhodné pro různé příležitosti - od rodinných oslav, přes svatby až po firemní akce.</p>
              <div className='flex flex-row gap-5'>
                <CustomHeaderButtons 
                  title='Více o nás'
                  href='/o-nas'
                  containerStyles='white-btn border-[var(--green)] border-[1px]'
                />
                <CustomHeaderButtons 
                  title='Prohlédnout menu'
                  href='/menu'
                  containerStyles='green-btn'
                />    
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default vitejte
