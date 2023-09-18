import Link from "next/link";

const TheHeader = () => {
    return (
        <header>
            <Link href="/">Home</Link>
            <Link href="/position">Positions</Link>
            <Link href="/structure">Portfolio Structure</Link>
            <Link href="/yield">Portfolio Yield</Link>
            <Link href="/finance">Financial Activity</Link>            
        </header>
    );
};

export { TheHeader };