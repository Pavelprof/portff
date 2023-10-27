import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const fetchTransactions = async ({
  time_transaction_after = "",
  time_transaction_before = "",
  account = [],
  type_transaction = [],
}) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_PORTF_URL}api/v1/transaction/?`;
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
  const session = await getServerSession(options)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PORTF_URL}api/v1/position/?settlement_currency=USD`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`
    }
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
  }
  return response.json();
}

export const fetchTransactionTypes = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PORTF_URL}api/v1/transaction/unique_transaction_types/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
