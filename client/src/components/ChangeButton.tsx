import  { useState } from "react";

export default function ChangeButton( {onUpdateKey} : {onUpdateKey : (privateKey : string)=> void } ) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

 
  return (
    <div>
      {/* Change Wallet Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="px-4 py-2  rounded-md border-[1px] hover:bg-[#e8e0e0] hover:text-black focus:outline-none"
      >
        Change Wallet
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-white text-lg mb-4">Enter Private Key</h2>
            <input
              type="text"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Enter Private Key"
              className="w-full px-4 py-2 mb-4 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={()=>{setIsPopupOpen(false)}}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={()=>{
                  onUpdateKey(privateKey);
                  setIsPopupOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

