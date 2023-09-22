'use client';


export default function ErrorWrapper(errorData) {

    const errorMessageString = errorData.error.message;

    const errorMessageObject = JSON.parse(errorMessageString);

    const detailMessage = errorMessageObject.detail;

    return <h1>{detailMessage}</h1>
}
