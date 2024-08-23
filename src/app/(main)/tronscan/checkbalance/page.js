'use client'

import { useState, useRef } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel';
import Loading from '../../components/loading';

export default function Home() {
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

      await fetch(`https://apilist.tronscanapi.com/api/accountv2?address=${tempAddress}`, {
        headers: {
          'TRON-PRO-API-KEY': '37df170b-a688-4aad-ad7c-1cd745e8f59b'
        }
      })
        .then(res => res.json()
          .then(data => {
            if (data.message == undefined) {
              const findItem = data.withPriceTokens.find((item) => item.tokenId === tokenId)
              if (findItem !== undefined && findItem.balance > 0) {
                arrDataOutputTemp.push({ name: tempAddress, balance: (findItem.balance / 10 ** findItem.tokenDecimal).toFixed(2) })
              }
            }

            console.log('listResult', arrDataOutputTemp)
          })
        )
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
    <div className='flex flex-col justify-center' >
      <h1 className='text-3xl mb-8 mt-2 font-bold items-center text-center text-white'>TRONSCAN</h1>
      <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
        <textarea rows="10" cols="50" className='border-4 rounded-[15px] border-gray-400' spellCheck="true" name='input' />
        <div className='flex justify-between'>
          <input type="file" name="inputByTxt" className='mt-4 text-white file:rounded-[8px]' />
          <div className='flex justify-center p-2'>
            <label htmlFor="countries" className="block text-sm font-medium text-gray-900 leading-[3.25rem] mx-2 text-white">Select a coin</label>
            <select name='typeCoin' className='border-2 px-2 py-1 my-2 rounded-[15px]'>
              <option value="_" defaultValue="selected">TRX Market</option>
              <option value="TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t">USDT</option>
            </select>
          </div>
        </div>
        <button type="submit" className='my-8 border-2 border-blue-500 py-3 px-6 bg-blue-400 text-white rounded-xl text-lg'>Submit</button>
      </form>
      <div>
        {isLoading ? <Loading /> : null}
      </div>
      <div className='item-center text-center'>
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
      {accoutHaveCoinList.length > 0 ?
        <div className='items-center mx-auto text-center'>
          <button onClick={onDownload} className=' my-8 border-2 border-blue-500 py-2 px-4 bg-blue-400 text-white items-center'>Export to .xlxs file</button> </div> : null}


    </div>
  )
}
