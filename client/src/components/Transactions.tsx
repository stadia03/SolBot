import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useUserStore } from "../store";

import axios from "axios";

const connection = new Connection(
  "https://solana-devnet.g.alchemy.com/v2/DZHbnZioln7-ITlLrhFgZZlcSSiP3yan"
);

export default function Transactions() {
  async function sendTnx() {
    // const privateKey= bs58.decode(useUserStore.getState().publicKey);

    // const keypair = Keypair.from(privateKey);

    // console.log(keypair.publicKey);

    const userPublickey = new PublicKey(useUserStore.getState().publicKey);
    // console.log(userPublickey);
    const ix = SystemProgram.transfer({
      fromPubkey: new PublicKey(userPublickey),
      toPubkey: new PublicKey(
        (document.getElementById("recAdd") as HTMLInputElement).value
      ),
      lamports:
        Number((document.getElementById("amt") as HTMLInputElement).value) *
        LAMPORTS_PER_SOL,
    });

    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = userPublickey;
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://sol-bot-lake.vercel.app/api/v1/tnx/sign",
      {
        tnx: serializedTx,
        email: useUserStore.getState().email,
        retry: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    // console.log("frontend res",response);
    alert(`Transaction confirmed!  ${response.data.signature.signature}`);
  }
  return (
    <>
    <div className="flex flex-col h-96  items-center ">
      <div>
        <p className="text-2xl py-5" >Transfer your solana in just one click</p>
      </div>
   
        <div className="my-2 flex items-center border border-gray-500 rounded-md overflow-hidden w-80">
          <input
            type="text"
            placeholder="Receiver Address"
            id="recAdd"
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button 
          className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 focus:outline-none"
          onClick={async()=>{
            (document.getElementById("recAdd") as HTMLInputElement).value = await navigator.clipboard.readText();
          }}
          >
            Paste
          </button>
        </div>
     
    
  
      <div className=" my-2 border border-gray-500 rounded-md overflow-hidden w-80">
        <input
          id="amt"
          type="text"
          placeholder="Amount in SOL"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="my-2">
      <button onClick={sendTnx} className="border border-gray-500 rounded-md px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none">
        Send
      </button>
      </div>

      </div>
    </>
  );
}
