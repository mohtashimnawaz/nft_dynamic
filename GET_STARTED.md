# 🚀 Get Started in 5 Minutes

## Prerequisites

Make sure you have these installed:
- ✅ Node.js 18+ ([Download](https://nodejs.org/))
- ✅ Yarn ([Install](https://yarnpkg.com/getting-started/install))
- ✅ Solana CLI ([Install](https://docs.solana.com/cli/install-solana-cli-tools))
- ✅ Anchor CLI 0.31.1 ([Install](https://www.anchor-lang.com/docs/installation))
- ✅ Phantom Wallet ([Install](https://phantom.app/))

## Step 1: Install Dependencies (1 min)

```bash
# Install root dependencies
yarn install

# Install frontend dependencies
cd app
yarn install
cd ..
```

## Step 2: Build the Program (1 min)

```bash
# Build the Anchor program
anchor build
```

You should see:
```
✓ Compiled successfully
```

## Step 3: Setup Solana (1 min)

```bash
# Configure for devnet
solana config set --url devnet

# Get some SOL for testing
solana airdrop 2

# Check your balance
solana balance
```

You should see: `2 SOL`

## Step 4: Deploy (1 min)

```bash
# Deploy to devnet
anchor deploy
```

You should see:
```
Program Id: <YOUR_PROGRAM_ID>
```

## Step 5: Start the App (1 min)

```bash
# Start the frontend
cd app
yarn dev
```

You should see:
```
  ➜  Local:   http://localhost:5173/
```

## Step 6: Use the App! 🎉

1. Open `http://localhost:5173` in your browser
2. Click **"Connect Wallet"**
3. Select **Phantom** and approve
4. Fill in the form:
   - **Name**: "My First NFT"
   - **Symbol**: "MNFT"
   - **URI**: "https://arweave.net/example"
5. Click **"MINT NFT"**
6. Approve the transaction in Phantom
7. See your NFT on Solana Explorer! 🎊

## What You'll See

### 🌌 Beautiful 3D Scene
- Floating animated spheres
- Particle effects
- Twinkling stars
- Smooth rotations

### 💎 Glassmorphic Card
- Frosted glass effect
- Gradient text
- Smooth animations
- Interactive buttons

### ✨ Smooth Interactions
- Hover effects
- Loading animations
- Success messages
- Error handling

## Common Issues & Fixes

### Issue: "Command not found: anchor"
```bash
# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli
```

### Issue: "Command not found: solana"
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
```

### Issue: "Insufficient funds"
```bash
# Get more SOL
solana airdrop 2
```

### Issue: "Port 5173 already in use"
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9
# Or use a different port
yarn dev --port 3000
```

### Issue: "Wallet not connecting"
- Make sure Phantom is installed
- Check you're on Devnet in Phantom settings
- Refresh the page
- Try a different browser

## Next Steps

### 🎨 Customize the UI
Edit `app/src/App.css` to change colors:
```css
/* Change primary color */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
```

### 🔧 Modify the Program
Edit `programs/nft/src/lib.rs` to add features:
```rust
// Add your custom logic here
```

### 📚 Learn More
- Read `FEATURES.md` for all features
- Check `VISUAL_GUIDE.md` for design details
- See `DEPLOYMENT.md` for production deploy
- Review `COMMANDS.md` for useful commands

## Testing Your Changes

### Test the Program
```bash
anchor test
```

### Test the Frontend
```bash
cd app
yarn build
```

### Test Everything
```bash
# Build program
anchor build

# Run tests
anchor test

# Build frontend
cd app && yarn build
```

## Deploy to Production

### 1. Switch to Mainnet
```bash
solana config set --url mainnet-beta
```

### 2. Update Config
Edit `app/src/App.tsx`:
```typescript
const network = WalletAdapterNetwork.Mainnet
```

### 3. Deploy
```bash
anchor deploy
cd app && yarn build
```

### 4. Host Frontend
Choose a hosting provider:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Push to gh-pages
- **IPFS**: Upload dist folder

## Quick Commands Reference

```bash
# Development
yarn dev                    # Start frontend
anchor test                 # Run tests
anchor build               # Build program

# Deployment
anchor deploy              # Deploy program
cd app && yarn build       # Build frontend

# Maintenance
anchor clean               # Clean builds
solana balance            # Check balance
solana logs               # View logs
```

## Project Structure

```
nft/
├── programs/nft/          # Anchor program
│   └── src/lib.rs        # Smart contract
├── app/                   # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.tsx       # Main app
│   │   └── main.tsx      # Entry point
│   └── package.json
├── tests/                 # Test files
├── target/               # Build output
└── README.md             # Documentation
```

## Getting Help

### Documentation
- 📖 `README.md` - Main documentation
- 🎨 `FEATURES.md` - Feature list
- 🎭 `VISUAL_GUIDE.md` - Design guide
- 🚀 `DEPLOYMENT.md` - Deploy guide
- 🛠️ `COMMANDS.md` - Command reference

### Resources
- [Anchor Docs](https://www.anchor-lang.com/)
- [Solana Docs](https://docs.solana.com/)
- [Metaplex Docs](https://docs.metaplex.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

### Community
- [Solana Discord](https://discord.gg/solana)
- [Anchor Discord](https://discord.gg/anchor)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/solana)

## Tips for Success

### 💡 Development Tips
1. Always test on devnet first
2. Keep your keypair safe
3. Use version control (git)
4. Document your changes
5. Test in multiple browsers

### 🎨 Design Tips
1. Customize colors to match your brand
2. Add your own 3D models
3. Create custom animations
4. Optimize images
5. Test on mobile devices

### 🔒 Security Tips
1. Never commit private keys
2. Use environment variables
3. Validate all inputs
4. Handle errors gracefully
5. Audit before mainnet

## Congratulations! 🎉

You now have a fully functional NFT minting app with:
- ✅ Beautiful 3D graphics
- ✅ Smooth animations
- ✅ Wallet integration
- ✅ Production-ready code

**Start minting NFTs and building amazing things!** 🚀

---

Need help? Check the other documentation files or reach out to the community!
