LIVE LINK: https://solbot-two.vercel.app/

![image](https://github.com/user-attachments/assets/a24c513e-7fc9-4e75-b391-89576e83d4c0)

![image](https://github.com/user-attachments/assets/24cd5687-082c-40e1-87a3-26c0064db4b2)

![image](https://github.com/user-attachments/assets/1fdb7d32-6f2b-494f-bd00-d413e4eed02a)

# SolBot 🚀  
A bot that simplifies transactions on the Solana blockchain by signing transactions on behalf of users. With SolBot, users can send SOL effortlessly without manually signing transactions every time.

---

## Features ✨
- **Keyless Transactions**: SolBot signs transactions programmatically, removing the need for users to manage private keys manually.
- **Secure Signing**: Transactions are authorized securely with user authentication mechanisms.
- **Effortless SOL Transfers**: Send SOL directly from the app without interacting with external wallets.
- **Public Key Management**: Automatically derives and displays your public key for easy access.

---

## How It Works ⚙️
1. **Authentication**:  
   Users are authenticated with a token (e.g., JWT) and linked to their unique account.

2. **Transaction Signing**:  
   SolBot uses the user’s private key to:
   - Derive the public key.
   - Sign transactions programmatically.
   - Submit transactions to the Solana blockchain.

3. **Integration**:  
   Client communicates with SolBot’s backend API to create, sign, and broadcast transactions.

---

## Installation 🔧
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/solbot.git
   cd solbot
