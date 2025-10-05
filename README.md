# Solana NFT Minting App

A complete full-stack application for minting NFTs on Solana using Anchor and React.

## Features

- ✅ Anchor smart contract for NFT minting with Metaplex
- ✅ React frontend with wallet integration
- ✅ Support for Phantom and Solflare wallets
- ✅ **Stunning 3D animated UI** with Three.js
- ✅ **Interactive animations** with Framer Motion
- ✅ **Glassmorphism design** with backdrop blur effects
- ✅ **Floating 3D spheres** and particle systems
- ✅ **Smooth transitions** and hover effects
- ✅ Complete test suite

## Project Structure

```
.
├── programs/nft/        # Anchor smart contract
├── tests/               # Anchor tests
├── app/                 # React frontend
└── target/              # Build artifacts
```

## Prerequisites

- Node.js 18+
- Rust and Cargo
- Solana CLI
- Anchor CLI (0.31.1)
- Yarn

## Setup

### 1. Install Dependencies

```bash
# Install root dependencies
yarn install

# Install frontend dependencies
cd app
yarn install
cd ..
```

### 2. Build the Program

```bash
anchor build
```

### 3. Deploy to Devnet

```bash
# Configure Solana CLI for devnet
solana config set --url devnet

# Airdrop SOL for testing
solana airdrop 2

# Deploy the program
anchor deploy
```

### 4. Run Tests

```bash
anchor test
```

## Running the Frontend

```bash
cd app
yarn dev
```

The app will be available at `http://localhost:5173`

## Usage

1. Connect your Phantom or Solflare wallet
2. Make sure you're on Devnet
3. Fill in the NFT details:
   - **Name**: Your NFT name (max 32 chars)
   - **Symbol**: Token symbol (max 10 chars)
   - **URI**: Metadata JSON URI (e.g., from Arweave or IPFS)
4. Click "Mint NFT"
5. Approve the transaction in your wallet

## Metadata JSON Format

Your metadata URI should point to a JSON file with this structure:

```json
{
  "name": "My NFT",
  "symbol": "MNFT",
  "description": "This is my awesome NFT",
  "image": "https://arweave.net/your-image-url",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Blue"
    }
  ]
}
```

## Program Architecture

The Anchor program (`programs/nft/src/lib.rs`) implements:

- **mint_nft**: Creates a new NFT with metadata and master edition
  - Mints 1 token to the owner's account
  - Creates Metaplex metadata account
  - Creates master edition (making it a unique NFT)

## Development

### Update Program ID

After building, update the program ID in:
- `Anchor.toml`
- `programs/nft/src/lib.rs` (declare_id!)
- `app/src/components/MintNFT.tsx` (if needed)

### Switch Networks

To use mainnet-beta:
1. Update `Anchor.toml` cluster setting
2. Update `app/src/App.tsx` network to `WalletAdapterNetwork.Mainnet`
3. Redeploy the program

## Troubleshooting

**Wallet not connecting?**
- Make sure you have Phantom or Solflare installed
- Check that you're on the correct network (Devnet)

**Transaction failing?**
- Ensure you have enough SOL for transaction fees
- Verify the metadata URI is accessible
- Check Solana Explorer for detailed error messages

**Build errors?**
- Run `anchor clean` and rebuild
- Make sure all dependencies are installed

## Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Documentation](https://docs.solana.com/)
- [Metaplex Documentation](https://docs.metaplex.com/)
- [Solana Cookbook](https://solanacookbook.com/)

## License

ISC
