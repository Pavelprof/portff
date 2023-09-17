export default function PositionList() {
  return<h1>Positions</h1>
}


// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function PositionList() {
//   const [positions, setPositions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('access_token');
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/investment-positions/', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setPositions(response.data);
//       } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {positions.map((position, index) => (
//         <div key={index}>
//           {/* Здесь вывод информации о инвестиционной позиции */}
//           {position.name} {/* Пример */}
//         </div>
//       ))}
//     </div>
//   );
// }
