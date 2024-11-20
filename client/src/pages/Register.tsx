import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {

  async function handleRegister() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const privateKey = (document.getElementById('pvtKey') as HTMLInputElement).value;
    try {
      const response = await axios.post('https://sol-bot-lake.vercel.app/auth/signup', {
        username,
        email,
        password,
        privateKey
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        console.log(response);
        alert('Successfully created user');
      } else {
        console.log(response);
        alert('Error creating user');
      }
    } catch (error: any) {
      // Check if the error response contains data with an error message
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // This will show "User already exists"
      } else {
        console.error('Error creating user', error);
        alert('An error occurred while creating the user');
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
          placeholder="FullName" 
          type="text"
           id="username"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className=" my-2 border border-gray-500 rounded-md overflow-hidden w-80">
        <input
         placeholder="Email" id="email"
          type="email"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className=" my-2 border border-gray-500 rounded-md overflow-hidden w-80">
        <input
        placeholder="Password" id="password" 
          type="password"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      
      <div className="my-2 flex items-center border border-gray-500 rounded-md overflow-hidden w-80">
          <input
            type="text"
            placeholder="Wallet private Key"
            id="pvtKey"
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button 
          className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 focus:outline-none"
          onClick={async()=>{
            (document.getElementById("pvtKey") as HTMLInputElement).value = await navigator.clipboard.readText();
          }}
          >
            Paste
          </button>
        </div>
      <div className="my-2">
      <button onClick={handleRegister} className="border border-gray-500 rounded-md px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none">
        Register
      </button>
      </div>

      <p className="my-10">
       Already an User?<Link to="/login" className="font-bold"> Login</Link>
      </p>
    </div>
  );
}
