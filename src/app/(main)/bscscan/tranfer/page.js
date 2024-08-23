'use client'

import React, { useState } from 'react'
import Web3 from 'web3';
const abiArray = require("./abi.json");

const TranferBsccan = () => {
    const [message, setMessage] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [token, setToken] = useState("TRX");


    const handleTranfer = async (e) => {
        e.preventDefault(e);

        const {
            toAddress: { value: toAddress },
            amount: { value: amount },
            token: { value: token },
            privateKey: { value: privateKey },
            fromAddress: { value: fromAddress }
        } = e.currentTarget;

        try {
            const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'));
            setMessage("Loading...");

            if (token == 'BNB') {
                const gasPrice = await web3.eth.getGasPrice()
                const nonce = await web3.eth.getTransactionCount(fromAddress)
                // Sign transaction
                let signTransaction = await web3.eth.accounts.signTransaction({
                    to: toAddress,
                    value: web3.utils.toWei(amount, 'ether'),
                    gas: 21000,
                    gasPrice: gasPrice,
                    nonce: nonce,
                }, privateKey);
                // Send transaction Singed 
                let tx = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction)

                // check status transaction
                if (tx.status.toString() == '1') {
                    setMessage('Tranfer success')
                } else {
                    setMessage('Tranfer fail')
                }

            } else if (token == '0x55d398326f99059ff775485246999027b3197955') {

                // contract instance
                const contract = await new web3.eth.Contract(abiArray, token);
                const decimals = await contract.methods.decimals().call();
                // // transfer event abi
                const transferAbi = await contract.methods.transfer(toAddress, (amount * 10 ** Number(decimals)).toString()).encodeABI();

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
                    setMessage('Tranfer success')
                } else {
                    setMessage('Tranfer fail')
                }
            }



        } catch (error) {
            console.log('error', error)
            setMessage('Tranfer fail, check your Balance, privateKey, fromAddress, toAddress, amount and try again')
        }
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl mt-2 font-bold uppercase text-white'>Bscscan Tranfer</h1>
            <form
                className=' p-16 pt-4 pb-0 flex justify-start flex-col w-full px-48'
                onSubmit={handleTranfer}>

                <div className='my-8 grid grid-cols-2 items-center w-full'>
                    <label htmlFor='privateKey' className='text-white text-lg'> Private Key Your Address</label>
                    <input className=' p-2 border-4 rounded-[15px]' name='privateKey' required onChange={(e) => { setPrivateKey(e.target.value) }} />
                </div>
                <div className='my-8 grid grid-cols-2 items-center'>
                    <label htmlFor='fromAddress' className='text-white text-lg'>From Addres</label>
                    <input className=' p-2 border-4 rounded-[15px]' name='fromAddress' required />
                </div>
                <div className='my-8 grid grid-cols-2 items-center'>
                    <label htmlFor='token' className='text-white text-lg'>
                        Token
                    </label>
                    <select className=' p-2 border-4 rounded-[15px]' name='token' onChange={(e) => setToken(e.target.value)} required>
                        <option value='BNB' defaultValue='selected'>
                            BNB
                        </option>
                        <option value='0x55d398326f99059ff775485246999027b3197955'>USDT</option>
                    </select>
                </div>
                <div className='my-8 grid grid-cols-2 items-center' >
                    <label htmlFor='toAddress' className='text-white text-lg'> To Address</label>
                    <input className=' p-2 border-4 rounded-[15px]' name='toAddress' required />
                </div>
                <div className='my-8 grid grid-cols-2 items-center'>
                    <label htmlFor='amount' className='text-white text-lg'> Amount </label>
                    <input
                        className=' p-2 border-4 rounded-[15px]'
                        name='amount'
                        required
                        min={0}
                        placeholder={token == "TRX" ? "1 = 1TRX " : "1 USDT = 1"}
                    />
                </div>
                <button
                    type='submit'
                    className='mx-auto w-1/3 my-8 border-2 border-blue-500 py-3 px-6 bg-blue-400 text-white rounded-xl text-lg'>
                    Tranfer
                </button>
            </form>
            <div className=''>
                <div className='text-2xl font-bold text-white'>{message}</div>
            </div>

        </div>

    )
}

export default TranferBsccan