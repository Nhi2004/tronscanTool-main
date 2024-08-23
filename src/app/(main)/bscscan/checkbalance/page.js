'use client'

import React, { useRef, useState } from 'react'
import Loading from '../../components/loading';
import { useDownloadExcel } from 'react-export-table-to-excel';

const CheckbalanceBscscan = () => {
    const tableRef = useRef(null);

    const [accoutHaveCoinList, setAccoutHaveCoinList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        let arrInput = []
        const tokenId = e.currentTarget.typeCoin.value
        if (e.currentTarget.input.value !== '') {
            arrInput = Array.from(new Set(e.currentTarget.input.value.split('\n')))
        } else if (e.currentTarget.inputByTxt.value != '') {
            const file = e.currentTarget.inputByTxt.files[0]
            const text = await file.text()
            arrInput = Array.from(new Set(text.split('\n')))
        }
        const arrDataOutputTemp = []
        setIsLoading(true)
        for (let i = 0; i < arrInput.length; i++) {
            const tempAddress = arrInput[i]

            if (tokenId === 'bsc') {
                await fetch(`https://api.bscscan.com/api?module=account&action=balance&address=${tempAddress}&apikey=4QS8V19IB9U91X5HSCC9D7K89I5TMHUH45`)
                    .then(res => res.json()
                        .then(data => {
                            if (data.result > 0) {
                                arrDataOutputTemp.push({ name: tempAddress, balance: (data.result / 10 ** 18).toFixed(3) })
                            }
                            console.log('ssssss', arrDataOutputTemp)
                        })
                    )
            } else if (tokenId === '0x55d398326f99059ff775485246999027b3197955') {
                await fetch(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x55d398326f99059ff775485246999027b3197955&address=${tempAddress}&tag=latest&apikey=4QS8V19IB9U91X5HSCC9D7K89I5TMHUH45`)
                    .then(res => res.json()
                        .then(data => {
                            if (data.result > 0) {
                                arrDataOutputTemp.push({ name: tempAddress, balance: (data.result / 10 ** 18).toFixed(3) })
                            }
                            console.log('ssssss', arrDataOutputTemp)
                        }
                        )
                    )
            }
        }

        setAccoutHaveCoinList(arrDataOutputTemp)
        setIsLoading(false)
    }

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'AddressList',
        sheet: 'Sheet 1'
    })
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-8 mt-2 font-bold text-white'>BSCSCAN</h1>
            <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <textarea rows="10" cols="50" className='border-4 rounded-[15px] border-gray-400' spellCheck="true" name='input' />
                <div className='flex justify-between'>
                    <input type="file" name="inputByTxt" className='mt-4 p-2 text-white file:rounded-[8px]' />
                    <div className='flex justify-center p-2'>
                        <label htmlFor="countries" className="block text-sm font-medium text-gray-900 leading-[3.25rem] mx-2 text-white">Select a coin</label>
                        <select name='typeCoin' className='border-2 px-2 py-1 my-2 rounded-lg rounded-[15px]'>
                            <option value="bsc" defaultValue="selected">BNB</option>
                            <option value="0x55d398326f99059ff775485246999027b3197955">USDT</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className='my-8 border-2 border-blue-500 py-3 px-6 bg-blue-400 text-white rounded-xl text-lg'>Submit</button>
            </form>
            <div>
                {isLoading ? <Loading /> : null}
            </div>
            <div>
                {accoutHaveCoinList.length > 0 ? <table ref={tableRef} className='w-96 mx-auto bg-[#390176]'>

                    <tr>
                    <th className="text-white">Address</th>
                    <th className="text-white">Balance</th>
                    </tr>

                    {accoutHaveCoinList.map((item, index) => {
                        return (
                            <tr key={index} className='my-4 '>
                                <td className='font-bold text-white'>{item.name}</td>
                                <td className='text-center text-white'>{item.balance}</td>
                            </tr>
                        )
                    }
                    )}
                </table> : <div className='text-white'> Don&lsquo;t have any data!</div>}
            </div>

            {accoutHaveCoinList.length > 0 ? <button onClick={onDownload} className='my-8 border-2 border-blue-500 py-2 px-4 bg-blue-400 text-white'>Export to .xlxs file</button> : null}
        </div>
    )

}

export default CheckbalanceBscscan