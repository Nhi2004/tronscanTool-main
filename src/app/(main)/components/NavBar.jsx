'use client'

import Link from 'next/link'
import React from 'react'

import { usePathname } from 'next/navigation'

const NavBar = () => {
    const pathname = usePathname()
    return (
        <div className='w-full p-5 h-full border-r border-r-solid border-r-white'>
            <Link href={'/tronscan/pagetronscan'} className={`text-white ${pathname == '/tronscan/checkbalance' || pathname == '/tronscan/tranfer' || pathname == '/tronscan/get-coin' ? 'bg-slate-600' : ''} px-5 hover:bg-slate-500 text-xl transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-angles-right p-2"></i>Tronscan</Link>
             <div className="col-span-1 pl-5">
                <Link href={'/tronscan/checkbalance'} className={`text-white ${pathname == '/tronscan/checkbalance' ? 'bg-slate-500' : ''} px-5 hover:bg-slate-500 text-base transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-wallet p-2"></i>Check Balance</Link>
                <Link href={'/tronscan/tranfer'} className={`text-white ${pathname == '/tronscan/tranfer' ? 'bg-slate-500' : ''} px-5 hover:bg-slate-500 text-base transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-arrow-right p-2"></i>Tranfer</Link>
                <Link href={'/tronscan/get-coin'} className={`text-white ${pathname == '/tronscan/get-coin' ? 'bg-slate-500' : ''} px-5 hover:bg-slate-500 text-base transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-coins p-2"></i>Get Coin</Link>
            </div> 
            <Link href={'/bscscan/pagebscscan'} className={`text-white ${pathname == '/bscscan/checkbalance' || pathname == '/bscscan/tranfer' || pathname == "/bscscan/multiple-transfer" || pathname == '/bscscan/get-coin' ? 'bg-slate-600' : ''} px-5 hover:bg-slate-500 text-xl transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-angles-right p-2"></i>Bscscan</Link>
            <div className="col-span-1 pl-5">
                <Link href={'/bscscan/checkbalance'} className={`text-white ${pathname == '/bscscan/checkbalance' ? 'bg-slate-500' : ''} px-5 hover:bg-slate-500 text-base transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-wallet p-2"></i>Checkbalance</Link>
                <Link href={'/bscscan/tranfer'} className={`text-white ${pathname == '/bscscan/tranfer' ? 'bg-slate-500' : ''} px-5 hover:bg-slate-500 text-base transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-arrow-right p-2"></i>Tranfer</Link>
                <Link href={'/bscscan/multiple-transfer'} className={`text-white ${pathname == '/bscscan/multiple-transfer' ? 'bg-slate-500' : ''} px-5 hover:bg-slate-500 text-base transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-arrows-turn-right p-2"></i> Multiple transfer</Link>
                <Link href={'/bscscan/get-coin'} className={`text-white ${pathname == '/bscscan/get-coin' ? 'bg-slate-500' : ''} px-5 hover:bg-slate-500 text-base transition-all duration-250 h-12  items-center flex cursor-pointer`}><i className="fa-solid fa-coins p-2"></i>Get Coin</Link>
            </div>
        </div>
    )
}

export default NavBar