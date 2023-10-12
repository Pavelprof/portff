import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

export const metadata = {
    title: 'FINANCE ACTIVITY',
    description: 'List of your transactions',
}

export default function FinanceLayout({ children }) {
    return (
        <div>
            <h1>Your finance activity</h1>
            {children}
        </div>
    );
}

FinanceLayout.propTypes = {
    children: PropTypes.node,
};