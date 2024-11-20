import { useEffect } from "react";
import { useUserStore } from "../store";
import Transactions from "../components/Transactions";
import axios from "axios";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import CopyButton from "../components/CopyButton";
import ChangeButton from "../components/ChangeButton";

export default function Home() {
  // const [token , setToken] = useState<string | null>(null);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchUserData = async () => {
      // setToken(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");

      try {
        const response = await axios.get(
          "https://sol-bot-lake.vercel.app/api/v1/tnx/getUser",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              email: userEmail,
            },
          }
        );

        // Update the store with user data

        const privateKeyUint8Array = bs58.decode(response.data.key.privateKey);

        // Create a Keypair object
        const keypair = Keypair.fromSecretKey(privateKeyUint8Array);
    
        // Derive the public key
        const publicKey = keypair.publicKey;
    
        // Print the public key in string format
        // console.log("Public Key:", );
        useUserStore.getState().setPublicKey(publicKey.toString());
        useUserStore.getState().setUseremail(response.data.user.email);
        useUserStore.getState().setUsername(response.data.user.username);
        // useUserStore.getState().setPublicKey();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the async function
    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    // setToken(null);
    localStorage.removeItem("userEmail");
    useUserStore.getState().setAuth(false); // Log out the user from the store
  };

  async function updateKey(privateKey : string) {
    const token = localStorage.getItem("token");
    // const key = (document.getElementById("key") as HTMLInputElement).value;
    
    const response = await axios.post(
      "https://sol-bot-lake.vercel.app/api/v1/tnx/updateKey",
      {
        email: useUserStore.getState().email,
        key: privateKey,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res",response.data.key);
    const privateKeyUint8Array = bs58.decode(response.data.key);

    // Create a Keypair object
    const keypair = Keypair.fromSecretKey(privateKeyUint8Array);

    // Derive the public key
    const publicKey = keypair.publicKey;

    // Print the public key in string format
    // console.log("Public Key:", );
    useUserStore.getState().setPublicKey(publicKey.toString());
  }

  return (
    <>
    <div className="flex flex-col h-72  items-center">
  <div>
    <p className="m-0 py-12 text-4xl">
      Welcome <span className="">{useUserStore.getState().username} </span>to <span className="text-purple-400 font-bold">SolBot.</span>
    </p>
  </div>
  <div className="flex flex-col items-center ">
    <p>
      Your public key 
    </p>
    <p >{useUserStore.getState().publicKey}</p>
  </div>
  <div className="flex gap-5 py-8">
   
    <CopyButton/>
    <ChangeButton onUpdateKey={updateKey} />
   
    <button className="border-[1px] px-4 rounded-md hover:bg-[#e8e0e0] hover:text-black" onClick={logout}>LOGOUT</button>
  </div>
</div>



    <Transactions />
    </>
  );
}
