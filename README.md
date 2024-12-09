# 1) Donation Website

This is a **Donation Website** project built using modern web technologies. It integrates **Solana blockchain** to handle wallet connections and transactions, along with features such as donation ranking and smooth animations using `framer-motion`.

---

## 2) Features

- **Donation Ranking System**: Displays and tracks top donors based on cumulative contributions.
- **Wallet Integration**: Supports seamless connection to Solana wallets.
- **Interactive Animations**: Smooth UI transitions powered by `framer-motion`.
- **Responsive Design**: Accessible and mobile-friendly.

---

## 3) Installation

### 3.1) Clone the Repository
```bash
git clone https://github.com/pannatron/Donation-Website.git
cd Donation-Website
```

 ### 3.2) Install Dependencies
Run the following commands to install the required dependencies:

#### 3.2.1) Core Dependencies
```bash

npm install @solana/web3.js react-hot-toast --legacy-peer-deps
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/wallet-adapter-react-ui @headlessui/react @heroicons/react framer-motion --legacy-peer-deps
```

#### 3.2.2) Framer Motion (if needed)
```bash

npm install framer-motion --legacy-peer-deps
```
## 4) Development
To start the development server:
```bash

npm run dev
```

Visit the website at `http://localhost:3000`.

## 5) How to Use
### 1. Connect Your Wallet:

- Use the "Connect Wallet" button to link your Solana wallet.
### 2. Make a Donation:

- Send tokens to the specified wallet address displayed on the website.
### 3. Check Your Ranking:

- View your rank in the leaderboard compared to other donors.
### 4. Track Rewards:

- Earn rewards based on donation milestones, with special benefits for top donors.
## 6) Technologies Used
- Next.js: Server-rendered React framework.
- Solana Wallet Adapter: To interact with Solana wallets.
- Framer Motion: For animations and transitions.
- React Hot Toast: For notifications.
- Headless UI: For accessible components.
- Heroicons: For scalable icons.
## 7) Notes
- Ensure you are using Node.js v16+ for compatibility.
- Use the `--legacy-peer-deps` flag when installing to avoid dependency conflicts.
## 8) Contribution
Contributions are welcome! Feel free to open an issue or submit a pull request to improve this project.
## License

This project is licensed under the [MIT License](LICENSE).

