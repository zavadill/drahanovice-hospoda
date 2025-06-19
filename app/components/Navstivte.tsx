import React from 'react'
import CustomHeaderButtons from './CustomHeaderButtons'

const Navstivte = () => {
  return (
    <div className='bg-[var(--brown)]'>
      <div className='width-p-page space-y-10 center-text'>
        <h5 className='kontaktuje-nadpis'>Navštivte nás</h5>
        <p className='max-w-2xl mx-auto kontaktuje-podnadpis'>Přijďte ochutnat naši rodinnou kuchyni v příjemném prostředí Hostince Na Nové v krásném prostředí Hané. Pro více informací nás neváhejte kontaktovat.</p>
        <CustomHeaderButtons 
                title='Kontaktuje nás'
                href='/kontakt'
                containerStyles='green-btn flex justify-center mx-auto'
            />
      </div>
    </div>
  )
}

export default Navstivte
