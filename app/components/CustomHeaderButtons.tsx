"use client";

import React from 'react'
import Link from 'next/link'
import { CustomButtonProps } from '@/types';

const CustomHeaderButtons = ({title, containerStyles, href}:CustomButtonProps) => {
  return (
    <Link
        className={containerStyles}
        href={href}
    >
        {title}
    </Link>
  )
}

export default CustomHeaderButtons


