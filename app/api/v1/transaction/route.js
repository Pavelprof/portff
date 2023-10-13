import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    
    const asset_transaction = searchParams.get('asset_transaction')

    let apiUrl = `${process.env.API_PORT_URL}api/v1/transaction/?`;

    if (asset_transaction) {
        apiUrl += `&asset_transaction=${encodeURIComponent(asset_transaction)}`;
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    const resData = await response.json()
    return NextResponse.json(resData);
}



export async function POST(req) {
    const response = await fetch(`${process.env.API_PORT_URL}api/v1/transaction/?`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    const resData = await response.json()
    return NextResponse.json({resData});
}