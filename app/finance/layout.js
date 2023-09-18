import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

export const metadata = {
    title: 'FINANCE ACTIVITY',
    description: 'List of your deals and transactions',
}

export default function FinanceLayout({ children }) {
    return (
        <div>
            <h1>Your finance activity</h1>
            <ul>
                <li><Link href="/finance/deal/1">Deal</Link></li>
                <li><Link href="/finance/transaction/1">Transaction</Link></li>
            </ul>
            {children}
        </div>
    );
}

FinanceLayout.propTypes = {
    children: PropTypes.node,
};




// export default function FinanceLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return <div>
//         <h1>Your finance activity</h1>
//         <ul>
//             <li><Link href="finance/deal">Deal</Link></li>
//             <li><Link href="finance/transaction">Transaction</Link></li>
//         </ul>
//         {children}
//     </div>
// }