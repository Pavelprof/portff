

import Link from 'next/link';
import { getPositions } from '@/services/services';

export default async function PositionList() {
  const positions = await getPositions()

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