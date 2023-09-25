'use client';

export default function ErrorWrapper(errorData) {
    let detailMessage;

    try {
        const errorMessageString = errorData.error.message;
        const errorMessageObject = JSON.parse(errorMessageString);
        detailMessage = errorMessageObject.detail;
    } catch (e) {
        // JSON.parse вызвал ошибку, вернем errorMessageString вместо этого
        detailMessage = errorData.error.message;
    }

    return <h1>{detailMessage}</h1>
}