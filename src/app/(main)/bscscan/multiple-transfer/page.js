'use client'

import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../components/loading';
import Web3 from 'web3';
const abiUSDT = require("./abiUSDT.json");
const abiXON = require("./abiXON.json");

const CheckbalanceBscscan = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState([]);

    // tạo biến message để hiển thị thông báo
    const arrMessage = []

    const handleSubmit = async (e) => {
        e.preventDefault()
        let listAddress = []
        // lấy dữ liệu từ form
        const {
            token: { value: token },
            privateKey: { value: privateKey },
            fromAddress: { value: fromAddress }
        } = e.currentTarget;

        // cắt chuỗi để lấy mảng các address
        listAddress = Array.from(new Set(e.currentTarget.input.value.split('\n')))

        // khởi tạo web3
        const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'));

        // gán abi token phù hợp với token
        const abiToken = token == '0x55d398326f99059ff775485246999027b3197955' ? abiUSDT : token == '0xF422bB9B57FB0ea0245A876aDB4b06D2f2eEdC7E' ? abiXON : ''

        // // chạy vòng lặp để gửi tiền
        for (let i = 0; i < listAddress.length; i++) {
            setIsLoading(true)
            setMessage([])
            const address = listAddress[i].split(',');
            // address[0] là địa chỉ nhận, address[1] là số tiền
            const toaddress = address[0].replace(/\s/g, '')
            const amount = address[1].replace(/\s+/g, '')
            try {
                if (token == "bnb") {
                    const gasPrice = await web3.eth.getGasPrice()
                    const nonce = await web3.eth.getTransactionCount(fromAddress)
                    let signTransaction = await web3.eth.accounts.signTransaction({
                        to: toaddress, // địa chỉ nhận
                        value: web3.utils.toWei(amount, 'ether'),
                        gas: 21000,
                        gasPrice: gasPrice,
                        nonce: nonce,
                    }, privateKey);
                    let tx = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction)
                    if (tx.status.toString() == '1') {
                        arrMessage.push({ address: address[0], status: "Tranfer success" })
                        console.log({ address: toaddress, status: "Tranfer success" });
                    } else {
                        arrMessage.push({ address: address[0], status: "Tranfer error" })
                        console.log({ address: address[0], status: "Tranfer error" });
                    }
                } else {
                    // contract instance

                    const contract = await new web3.eth.Contract(abiToken, token);
                    const decimals = await contract.methods.decimals().call();
                    // transfer event abi
                    const transferAbi = await contract.methods.transfer(toaddress, (amount * 10 ** Number(decimals)).toString()).encodeABI();

                    const gasPrice = await web3.eth.getGasPrice()
                    const nonce = await web3.eth.getTransactionCount(fromAddress)
                    let signTransaction = await web3.eth.accounts.signTransaction({
                        from: fromAddress,
                        to: token,
                        data: transferAbi,
                        value: 0,
                        gas: 100000,
                        gasPrice: gasPrice,
                        nonce: nonce,
                    }, privateKey);
                    let tx = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction)
                    if (tx.status.toString() == '1') {
                        arrMessage.push({ address: toaddress, status: "Tranfer success" })
                        console.log({ address: toaddress, status: "Tranfer success" });
                    } else {
                        arrMessage.push({ address: address[0], status: "Tranfer error" })
                        console.log({ address: address[0], status: "Tranfer error" });
                    }
                }
            }
            catch (error) {
                console.log('error', error);
            }
        }
        setMessage(arrMessage)
        setIsLoading(false)
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-8 mt-2 font-bold uppercase text-white'>BSCSCAN Multiple Transfer</h1>
            <form className=' items-center p-16 pt-4 pb-0 flex justify-start flex-col w-full px-48' onSubmit={handleSubmit}>
                {/* input private key */}
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='privateKey' className='col-span-1 text-white text-lg'> Private Key Your Address</label>
                    {/* <input className=' p-2 border-4 col-span-2' name='privateKey' required onChange={(e) => { setPrivateKey(e.target.value) }} /> */}
                    <input className=' p-2 border-4 col-span-2  rounded-[15px]' name='privateKey' required />
                </div>
                {/* input fromAddress */}
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='fromAddress' className='col-span-1 text-white text-lg'> Enter Your Address</label>
                    <input className=' p-2 border-4 col-span-2 rounded-[15px]' name='fromAddress' required />
                </div>
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='token' className='text-white text-lg'>
                        Token
                    </label>
                    <select className=' p-2 border-4 rounded-[15px]' name='token' required>
                        <option value='BNB' defaultValue='selected'>
                            BNB
                        </option>
                        <option value="0x55d398326f99059ff775485246999027b3197955">USDT</option>
                        <option value="0xF422bB9B57FB0ea0245A876aDB4b06D2f2eEdC7E">XON</option>
                    </select>
                </div>
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='input' className='col-span-1 text-white text-lg'> Enter list address to</label>
                    <textarea rows="10" cols="50" className='border-4 border-gray-400 col-span-2 rounded-[15px]' spellCheck="true" name='input' placeholder='ex: 0x033203B40FFE6443E68983542e561f77031F645a, 0.002' />
                </div>
                <button type="submit" className='my-8 border-2 border-blue-500 py-3 px-6 bg-blue-400 text-white rounded-xl text-lg' > Submit</button >
            </form >
            <div>
                {isLoading ? <Loading /> : null}
            </div>
            <div>
                <div className='bg-[#390176]'>
                    {message.map((item, index) => {
                        return (
                            <div key={index} className='text-xl  flex text-white'>
                                <p className='text-white'>{item.address}</p>
                                <p className={`ml-4 font-bold text-white ${item.status === "Tranfer success" ? "text-green-600" : "text-red-600"}`}>{item.status}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div >
    )

}

export default CheckbalanceBscscan