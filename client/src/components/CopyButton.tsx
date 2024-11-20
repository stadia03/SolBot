import  { useState } from "react";
import { useUserStore } from "../store";

function CopyButton() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const publicKey = useUserStore.getState().publicKey;
    navigator.clipboard.writeText(publicKey).then(() => {
      setIsCopied(true); // Change text to tick
      setTimeout(() => setIsCopied(false), 1000); // Reset after 2 seconds
    });
  };

  return (
    <button 
      onClick={handleCopy} 
      className="px-4 py-2  border-[1px] hover:bg-[#e8e0e0] hover:text-black rounded-md focus:outline-none"
    >
      {isCopied ? "✔️" : "Copy"}
    </button>
  );
}

export default CopyButton;
