'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [key, setKey] = useState(0);

  const handleShowSession = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div key={key}>
      <h1>Home</h1>
      <button onClick={handleShowSession}>
        Show Session
      </button>
      <div>
        <h2>Session:</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}