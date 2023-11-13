
export async function getPositions(session) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PORTF_URL}/api/v1/position/?settlement_currency=USD`, {
    headers: {
      'Authorization': `Bearer ${session.user.accessToken}`
    }
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
  }
  return response.json();
}
