/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'

const layout = ({ children }) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname()
    return (
            <div className="col-span-4 flex flex justify-center items-center ">
                {children}
            </div>
    )
}

export default layout