async function getData(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/v1/position/${id}/?settlement_currency=USD`, {
    next : {
      revalidate: 20
    }
  });

  return response.json() 
}

export async function generateMetadata() {
  return {title: 'Position'};
}

export default async function Position({params: {id}}) {
    const position = await getData(id);
    
    return (
      <>
        <h1>Position {id}</h1>
        <p>Account: {position.account}</p>
        <p>Ticker: {position.asset.ticker}</p>
        <p>Isin: {position.asset.isin}</p>
        <p>Name: {position.asset.full_name_asset}</p>
        <p>Price: {position.asset.price} {position.asset.currency_base_settlement}</p>
        <p>Quantity: {position.quantity_position}</p>
        <p>Value (in requsted currency): {position.total_value}</p>
        
      </>
    );
  }