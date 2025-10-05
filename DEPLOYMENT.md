# 🚀 Deployment Guide

## Prerequisites Checklist

- [x] Node.js 18+ installed
- [x] Yarn package manager
- [x] Solana CLI configured
- [x] Anchor CLI 0.31.1
- [x] Rust and Cargo
- [x] Phantom or Solflare wallet

## Step-by-Step Deployment

### 1. Install Dependencies

```bash
# Root dependencies
yarn install

# Frontend dependencies
cd app
yarn install
cd ..
```

### 2. Build the Anchor Program

```bash
# Clean previous builds
anchor clean

# Build the program
anchor build
```

### 3. Configure Solana

```bash
# Set to devnet
solana config set --url devnet

# Check your wallet
solana address

# Airdrop SOL for testing (if needed)
solana airdrop 2
```

### 4. Deploy to Devnet

```bash
# Deploy the program
anchor deploy

# Note the program ID from the output
# Update it in Anchor.toml if needed
```

### 5. Run Tests

```bash
# Run the test suite
anchor test

# Or test without deploying
anchor test --skip-deploy
```

### 6. Start the Frontend

```bash
# Development mode
cd app
yarn dev

# Or from root
yarn dev
```

The app will be available at: `http://localhost:5173`

### 7. Build for Production

```bash
cd app
yarn build

# Preview the production build
yarn preview
```

## Environment Configuration

### Devnet (Default)
- Network: Devnet
- RPC: `https://api.devnet.solana.com`
- Explorer: `https://explorer.solana.com/?cluster=devnet`

### Mainnet-Beta
To switch to mainnet:

1. Update `Anchor.toml`:
```toml
[provider]
cluster = "mainnet"
```

2. Update `app/src/App.tsx`:
```typescript
const network = WalletAdapterNetwork.Mainnet
```

3. Redeploy:
```bash
solana config set --url mainnet-beta
anchor deploy
```

## Hosting Options

### Vercel (Recommended)
```bash
cd app
vercel deploy
```

### Netlify
```bash
cd app
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
cd app
yarn build
# Push dist folder to gh-pages branch
```

### IPFS/Arweave
```bash
cd app
yarn build
# Upload dist folder to IPFS or Arweave
```

## Environment Variables

Create `.env` in the app directory:

```env
VITE_SOLANA_NETWORK=devnet
VITE_RPC_ENDPOINT=https://api.devnet.solana.com
```

## Troubleshooting

### Build Errors

**Issue**: Cargo build fails
```bash
# Solution: Update Rust
rustup update
```

**Issue**: Anchor version mismatch
```bash
# Solution: Install correct version
cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli
```

### Frontend Issues

**Issue**: Module not found
```bash
# Solution: Reinstall dependencies
cd app
rm -rf node_modules
yarn install
```

**Issue**: WebGL not working
- Check browser supports WebGL
- Update graphics drivers
- Try different browser

### Deployment Issues

**Issue**: Insufficient SOL
```bash
# Solution: Airdrop more SOL
solana airdrop 2
```

**Issue**: Program deployment fails
```bash
# Solution: Check program size
solana program show <PROGRAM_ID>

# Increase compute units if needed
```

## Performance Optimization

### Frontend
1. Enable code splitting
2. Lazy load 3D components
3. Optimize images
4. Use CDN for static assets
5. Enable gzip compression

### Program
1. Minimize account data
2. Optimize instruction size
3. Use efficient data structures
4. Batch transactions when possible

## Security Checklist

- [ ] Program audited
- [ ] Private keys secured
- [ ] RPC endpoints rate-limited
- [ ] Input validation implemented
- [ ] Error handling robust
- [ ] CORS configured properly
- [ ] Dependencies updated

## Monitoring

### Program Monitoring
```bash
# Check program logs
solana logs <PROGRAM_ID>

# Monitor transactions
solana confirm -v <SIGNATURE>
```

### Frontend Monitoring
- Use Vercel Analytics
- Set up Sentry for error tracking
- Monitor RPC usage
- Track wallet connections

## Maintenance

### Regular Updates
```bash
# Update dependencies
yarn upgrade-interactive

# Update Anchor
anchor upgrade

# Update Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

### Backup
- Backup program keypairs
- Save deployment addresses
- Document configuration
- Version control everything

## Cost Estimates

### Devnet
- Free SOL via airdrop
- No deployment costs
- Perfect for testing

### Mainnet-Beta
- Program deployment: ~2-5 SOL
- Account rent: ~0.002 SOL per account
- Transaction fees: ~0.000005 SOL per transaction
- Monthly costs: Variable based on usage

## Support Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Metaplex Docs](https://docs.metaplex.com/)
- [Discord Communities](https://discord.gg/solana)
