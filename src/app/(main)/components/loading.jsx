import React from 'react'
import LoadingIcon from '../../../../public/Spinner-1s-200px'
import Image from 'next/image'

const Loading = () => {
    return (
        <div className='flex justify-center text-center'>
            <div className='items-center text-center leading-10'>Processing
            </div>
            <Image alt='loading' src={"/loading.png"} width={40} height={40}></Image>
        </div>
    )
}

export default Loading