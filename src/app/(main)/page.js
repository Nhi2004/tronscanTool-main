'use client'

import React from 'react'
import { redirect } from "next/navigation";

const HomePage = () => {
    redirect('/tronscan/checkbalance');
}

export default HomePage