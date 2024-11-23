import axios from 'axios';
import { useState } from 'react';
import { useUserStore } from '../store';
import { Link } from 'react-router-dom';


export default function Login() {
  const [loading, setLoading] = useState(false); // State to track loading

  async function handleLogin() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        'https://sol-bot-lake.vercel.app/auth/signin',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', response.data.user.email);
        useUserStore.getState().setAuth(true);
      } else {
        alert(response.data.message);
        console.log('Failed to get token');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error('Error logging in', error);
        alert('An error occurred during login');
      }
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="m-0 py-12 text-4xl">
          Welcome to <span className="text-purple-400 font-bold">SolBot</span>
        </p>
      </div>
      <div className="my-2 border border-gray-500 rounded-md overflow-hidden w-80">
        <input
          id="email"
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className="my-2 border border-gray-500 rounded-md overflow-hidden w-80">
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="my-2">
        {loading?(
          <div className="flex items-center">
      <img
        src="/assets/loading.svg"
        alt="Loading..."
        // className="w-5 h-5 animate-spin mr-2" // Added mr-2 for spacing if needed
        style={{ width: '30px', height: '30px' }} // Ensure consistent size
      />
    </div>
        ) : (
          <button
          onClick={handleLogin}
          disabled={loading}
          className={`border border-gray-500 rounded-md px-4 py-2 ${
            loading ? 'bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
          } text-white focus:outline-none flex items-center justify-center`}
        >
            Login
         
        </button>
        )}
     

      </div>

      <p className="my-10">
        New User? <Link to="/register" className="font-bold">Create an account</Link>
      </p>
    </div>
  );
}
