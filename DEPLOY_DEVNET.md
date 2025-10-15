# 🚀 Deploy to Devnet - Step by Step Guide

## Current Status
- ✅ Anchor.toml configured for devnet
- ✅ Program built successfully
- ⏳ Need more SOL for deployment

## Option 1: Get More SOL from Faucet (Recommended)

### Step 1: Get Your Wallet Address
```bash
solana address
```

### Step 2: Use Web Faucets
Visit these faucets and request SOL:

1. **SolFaucet** - https://solfaucet.com/
   - Enter your address
   - Complete captcha
   - Get 1-2 SOL

2. **QuickNode Faucet** - https://faucet.quicknode.com/solana/devnet
   - Enter your address
   - Get 0.5 SOL

3. **Solana Faucet** - https://faucet.solana.com/
   - Enter your address
   - Get SOL

### Step 3: Check Balance
```bash
solana balance
```
You need at least **2 SOL** for deployment.

### Step 4: Deploy
```bash
anchor deploy
```

## Option 2: Use CLI Airdrop (Rate Limited)

```bash
# Wait between requests (60 seconds)
solana airdrop 1
sleep 60
solana airdrop 1
```

## Option 3: Deploy with Existing Buffer

If you have a partial deployment, you can resume:

```bash
# Check for existing buffers
solana program show --buffers

# Close old buffers to recover SOL
solana program close <BUFFER_ADDRESS>

# Then deploy
anchor deploy
```

## Deployment Command

Once you have enough SOL:

```bash
# Method 1: Using Anchor (Recommended)
anchor deploy

# Method 2: Using Solana CLI directly
solana program deploy target/deploy/nft.so --program-id target/deploy/nft-keypair.json
```

## Verify Deployment

After successful deployment:

```bash
# Check program exists
solana program show FQuod36e7YC62xJPhpwJvBZMzsVPn36bYL2pjHMWNT2y

# Get program info
anchor idl init FQuod36e7YC62xJPhpwJvBZMzsVPn36bYL2pjHMWNT2y -f target/idl/nft.json
```

## Run Tests on Devnet

```bash
anchor test --skip-local-validator
```

## Common Issues

### Issue: Insufficient Funds
**Solution:** Get more SOL from faucets above

### Issue: Rate Limited
**Solution:** Wait 60 seconds between airdrop requests

### Issue: Connection Refused
**Solution:** Make sure Anchor.toml has `cluster = "devnet"`

### Issue: Transaction Failed
**Solution:** 
```bash
# Close any stuck buffers
solana program show --buffers
solana program close <BUFFER_ADDRESS>

# Try again
anchor deploy
```

## After Deployment

### Update Frontend
The program ID is already in the IDL, but verify:
```bash
cat target/idl/nft.json | grep "address"
```

### Start Frontend
```bash
cd app
yarn dev
```

### Test Minting
1. Open http://localhost:5173
2. Connect Phantom wallet (set to Devnet)
3. Click "Start Minting"
4. Fill in NFT details
5. Mint your first NFT!

## Deployment Costs

- **Program Deployment**: ~1.9 SOL (one-time)
- **Transaction Fees**: ~0.001 SOL per transaction
- **Account Rent**: ~0.002 SOL per NFT

## Next Steps

After successful deployment:

1. ✅ Test minting on devnet
2. ✅ Verify on Solana Explorer
3. ✅ Share with friends
4. 🚀 Deploy to mainnet (when ready)

## Mainnet Deployment

When ready for production:

1. Update Anchor.toml:
```toml
[provider]
cluster = "mainnet"
```

2. Update frontend (app/src/App.tsx):
```typescript
const network = WalletAdapterNetwork.Mainnet
```

3. Get mainnet SOL (buy from exchange)

4. Deploy:
```bash
anchor deploy
```

## Support

If you encounter issues:
- Check Solana status: https://status.solana.com/
- Solana Discord: https://discord.gg/solana
- Anchor Discord: https://discord.gg/anchor

---

**Current Balance Check:**
```bash
solana balance
```

**Get Your Address:**
```bash
solana address
```

**Deploy When Ready:**
```bash
anchor deploy
```

Good luck! 🚀
