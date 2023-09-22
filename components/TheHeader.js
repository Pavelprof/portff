// import { useState } from 'react';
// import Link from 'next/link';
// import './TheHeader.css';  // Импортируйте ваш CSS файл

// const TheHeader = () => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     return (
//         <header>
//             <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
//                 {/* Простая бургер-иконка */}
//                 <div></div>
//                 <div></div>
//                 <div></div>
//             </div>
//             <ul className={`menu-links${menuOpen ? ' open' : ''}`}>
//                 <li><Link href="/">Home</Link></li>
//                 <li><Link href="/position">Positions</Link></li>
//                 <li><Link href="/structure">Portfolio Structure</Link></li>
//                 <li><Link href="/yield">Portfolio Yield</Link></li>
//                 <li><Link href="/finance">Financial Activity</Link></li>
//             </ul>
//         </header>
//     );
// };

// export { TheHeader };




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