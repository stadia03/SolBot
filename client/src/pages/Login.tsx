import axios from 'axios';
import { useUserStore } from '../store';
import { Link } from 'react-router-dom';

export default function Login() {

  async function handleLogin() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      const response = await axios.post('https://sol-bot-lake.vercel.app/auth/signin', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail',response.data.user.email);
        useUserStore.getState().setAuth(true);
  
        // useUserStore.setState().setUser

       
      } else {
        alert(response.data.message);
        console.log("Failed to get token");
      }
    } catch (error: any) {
      // Check if the error response contains data with an error message
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // This will show "Invalid password" or any other error message
      } else {
        console.error('Error logging in', error);
        alert('An error occurred during login');
      }
    }
  }

  return (
    <div className="flex flex-col   items-center">
    
    
    <div>
    <p className="m-0 py-12 text-4xl">
      Welcome to <span className="text-purple-400 font-bold">SolBot</span>
    </p>
  </div>
      <div className=" my-2 border border-gray-500 rounded-md overflow-hidden w-80">
        <input
          id="email" 
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className=" my-2 border border-gray-500 rounded-md overflow-hidden w-80">
        <input
         placeholder="Password" id="password" 
          type='password'
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="my-2">
      <button onClick={handleLogin} className="border border-gray-500 rounded-md px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none">
        Login
      </button>
      </div>

      <p className="my-10">
        New User? <Link to="/register" className="font-bold">Create an account</Link>
      </p>
    </div>
  );
}
