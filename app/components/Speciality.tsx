import React from 'react'
import CustomSpecialityButton from './CustomSpecialityButton'

const Speciality = () => {
  return (
    <div>
      <div className='width-p-page'>
        <div className='center-text pb-20'>
            <h3 className='text-nadpis'>Speciality našeho hostince</h3>
            <p className='text-podnadpis'>Ochutnejte rodinnou českou kuchyni v moderním podání</p>
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
            <div className='card-speciality'>
                <div>img</div>
                <p className='nase-nadpis'>Svíčková na smetaně</p>
                <p className='nase-podnadpis'>Tradiční hovězí svíčková na smetaně s houskovým knedlíkem, brusinkami a šlehačkou.</p>
                <CustomSpecialityButton />
            </div>
            <div className='card-speciality'>
                <div>img</div>
                <p className='nase-nadpis'>Vepřo knedlo zelo</p>
                <p className='nase-podnadpis'>Pečená vepřová krkovice s bílým a červeným zelím a variací knedlíků.</p>
                <CustomSpecialityButton />
            </div>
            <div className='card-speciality'>
                <div>img</div>
                <p className='nase-nadpis'>Guláš s knedlíkem</p>
                <p className='nase-podnadpis'>Hovězí guláš s houskovým knedlíkem a čerstvou cibulkou, připravený podle receptury našich babiček.</p>
                <CustomSpecialityButton />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Speciality
