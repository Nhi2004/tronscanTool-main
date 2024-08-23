"use client";

import React, { useState } from "react";

const TronWeb = require("tronweb");

const Tranfer = () => {
    const [message, setMessage] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [token, setToken] = useState("TRX");
    const tronWeb = new TronWeb({
        fullHost: "https://api.trongrid.io",
        headers: { "TRON-PRO-API-KEY": "764b0026-da1c-45c9-b75f-c39e4e67c7f5" },
        privateKey: privateKey,
    });


    const TranferUSDT = async (fromAddress, toAddress, amount) => {
        const options = {
            feeLimit: 30000000,
            callValue: 0,
        };
        try {
            const tx = await tronWeb.transactionBuilder.triggerSmartContract(
                "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
                "transfer(address,uint256)",
                options,
                [
                    {
                        type: "address",
                        value: toAddress,
                    },
                    {
                        type: "uint256",
                        value: amount * 1000000,
                    },
                ],
                tronWeb.address.toHex(fromAddress)
            );
            const signedTx = await tronWeb.trx.sign(tx.transaction);
            const broadcastTx = await tronWeb.trx.sendRawTransaction(signedTx);
            if (broadcastTx.result === true) {
                setMessage("Successful Transaction");
            }
        } catch (error) {
            setMessage('Transaction Failed. Please check balance, address, key private and try again');
            console.log(error)
        }
    };

    const handleTranfer = async (e) => {
        e.preventDefault();
        try {
            setMessage("Loading...");
            const {
                toAddress: { value: toAddress },
                amount: { value: amount },
                token: { value: token },
            } = e.currentTarget;
            const fromAddress = e.currentTarget.fromAddress?.value;
            if (token == "TRX") {
                let amountTrx = amount * 1000000;
                const broadcast = await tronWeb.trx.sendTransaction(
                    toAddress,
                    amountTrx,
                    e.currentTarget.privateKey.value
                );
                if (broadcast.result === true) {
                    setMessage("Successful Transaction");
                } else {
                    setMessage("Transaction Failed. Please check balance, address, key private and try again");
                }

            } else if (token == "USDT") {

                TranferUSDT(fromAddress, toAddress, amount);
            }
        }
        catch (error) {
            setMessage("Transaction Failed. Please check balance, address, key private and try again");
            console.log(error)
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl mt-2 font-bold uppercase text-white'>Tronscan Tranfer</h1>
            <form
                className=' p-16 pt-4 pb-0 flex justify-start flex-col w-full px-48'
                onSubmit={handleTranfer}>

                <div className='my-8 grid grid-cols-2 items-center w-full'>
                    <label htmlFor='privateKey' className="text-white text-lg"> Private Key Your Address</label>
                    <input className=' p-2 border-4 rounded-[15px] ' name='privateKey' required onChange={(e) => { setPrivateKey(e.target.value) }} />
                </div>
                {token == "USDT" && (<div className='my-8 grid grid-cols-2 items-center'>
                    <label htmlFor='fromAddress' className="text-white text-lg">From Addres</label>
                    <input className=' p-2 border-4 rounded-[15px] ' name='fromAddress' required />
                </div>)}
                <div className='my-8 grid grid-cols-2 items-center'>
                    <label htmlFor='token' className='text-white text-lg'>
                        Token
                    </label>
                    <select className=' p-2 border-4 rounded-[15px]' name='token' onChange={(e) => setToken(e.target.value)} required>
                        <option value='TRX' defaultValue='selected'>
                            TRX
                        </option>
                        <option value='USDT'>USDT</option>
                    </select>
                </div>
                <div className='my-8 grid grid-cols-2 items-center' >
                    <label htmlFor='toAddress' className="text-white text-lg"> To Address</label>
                    <input className=' p-2 border-4 rounded-[15px] ' name='toAddress' required />
                </div>
                <div className='my-8 grid grid-cols-2 items-center'>
                    <label htmlFor='amount' className="text-white text-lg"> Amount </label>
                    <input
                        className=' p-2 border-4 rounded-[15px] '
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
    );
};

export default Tranfer;
