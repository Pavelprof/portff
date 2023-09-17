export default function Home() {
  return<h1>Home</h1>
}


// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function Home() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/token/', {
//         username,
//         password,
//       });
//       const { access } = response.data;
//       localStorage.setItem('access_token', access);
//       router.push('/investment-positions'); // Перенаправление на страницу с инвестиционными позициями
//     } catch (error) {
//       console.error('Ошибка авторизации:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Войти</button>
//     </form>
//   );
// }
