

import Link from 'next/link';
import { getPositions } from '@/services/services';
import { getServerSession } from 'next-auth';
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function PositionList() {
  const session = await getServerSession(options);
  const positions = await getPositions(session)

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