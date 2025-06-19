import React from 'react'
import CustomHeaderButtons from './CustomHeaderButtons'

const Galerie = () => {
  return (
    <div>
      <div className='width-p-page flex flex-col'>
        <div className='center-text pb-20'>
            <h4 className='text-nadpis'>Galerie</h4>
            <p className='text-podnadpis'>Nahlédněte do naší kuchyně i interiéru</p>
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
            <div className='flex justify-center rounded-lg flex-1/3 bg-gray-400 py-20'>img</div>
            <div className='flex justify-center rounded-lg flex-1/3 bg-gray-400 py-20'>img</div>
            <div className='flex justify-center rounded-lg flex-1/3 bg-gray-400 py-20'>img</div>
        </div>
            <CustomHeaderButtons 
                title='Zobrazit celou galerii'
                href='/galerie'
                containerStyles='green-btn flex justify-center mx-auto mt-10'
            />
      </div>
    </div>
  )
}

export default Galerie
