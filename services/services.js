export const fetchTransactions = async ({
  time_transaction_after = "",
  time_transaction_before = "",
  account = [],
  type_transaction = [],
}) => {
  const baseUrl = `${process.env.API_BASE_URL}api/v1/transaction/?`;
  const params = new URLSearchParams();

  if (time_transaction_after) params.append('time_transaction_after', time_transaction_after);
  if (time_transaction_before) params.append('time_transaction_before', time_transaction_before);

  account.forEach(a => params.append('account', a));
  type_transaction.forEach(t => params.append('type_transaction', t));

  const response = await fetch(baseUrl + params.toString());

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  return response.json();
};


export async function getPositions() {
  const response = await fetch(`${process.env.API_BASE_URL}api/v1/position/?settlement_currency=USD`);
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
  }
  return response.json();
}