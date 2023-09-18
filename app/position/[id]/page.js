async function getData(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/v1/position/${id}?settlement_currency=USD`, {
    next : {
      revalidate: 20
    }
  });

  return response.json() 
}

export default async function Position({params: {id}}) {
    const position = await getData(id);
    
    return (
      <>
        <h1>Position {id}</h1>
        <p>{position.asset.ticker}</p>
      </>
    );
  }