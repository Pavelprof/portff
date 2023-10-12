'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ErrorWrapper(errorData) {
    let detailMessage;

    try {
        const errorMessageString = errorData.error.message;
        const errorMessageObject = JSON.parse(errorMessageString);
        detailMessage = errorMessageObject.detail;
    } catch (e) {
        detailMessage = errorData.error.message;
    }

    useEffect(() => {
        console.log('Test')
    })

    return (
    <div>
        <h1>{detailMessage}</h1>
        <p><Link href= "/">Перейти на главную страницу</Link></p>
    </div>
    )
}