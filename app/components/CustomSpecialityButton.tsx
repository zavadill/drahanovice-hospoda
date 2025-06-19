import Link from 'next/link'
import React from 'react'

const CustomSpecialityButton = () => {
  return (
    <Link
        href="/menu"
        className='text-[var(--green)]'
    >
        Zobrazit menu --
    </Link>
  )
}

export default CustomSpecialityButton
