import Link from 'next/link';

async function getData() {
  const response = await fetch('http://127.0.0.1:8000/api/v1/position/?settlement_currency=USD');
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
  }
  return response.json();
}

export default async function PositionList() {
  const positions = await getData()

  return (
  <>
    <h1>Positions</h1>
    <ul>
      {positions.map(position => (
        <li key={position.id}>
          <Link href={`/position/${position.id}`}>{position.asset.ticker}</Link>
        </li>
      ))}
    </ul>
  </>
  )
}