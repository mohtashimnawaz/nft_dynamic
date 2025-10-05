# 🛠️ Useful Commands Reference

## Quick Commands

### Development
```bash
# Start everything (from root)
yarn dev                    # Start frontend dev server

# Or manually
cd app && yarn dev         # Frontend only
anchor test --skip-deploy # Test without deploying
```

### Building
```bash
anchor build               # Build Anchor program
anchor clean              # Clean build artifacts
cd app && yarn build      # Build frontend for production
```

### Testing
```bash
anchor test               # Run all tests
anchor test --skip-build  # Test without rebuilding
anchor test --skip-deploy # Test without deploying
```

## Solana CLI Commands

### Configuration
```bash
# View current config
solana config get

# Set cluster
solana config set --url devnet
solana config set --url mainnet-beta
solana config set --url localhost

# Set keypair
solana config set --keypair ~/.config/solana/id.json
```

### Wallet Management
```bash
# Check balance
solana balance

# Get address
solana address

# Airdrop SOL (devnet only)
solana airdrop 1
solana airdrop 2
solana airdrop 5

# Transfer SOL
solana transfer <RECIPIENT> <AMOUNT>
```

### Program Management
```bash
# Deploy program
anchor deploy

# Show program info
solana program show <PROGRAM_ID>

# Close program (recover rent)
solana program close <PROGRAM_ID>

# Extend program
solana program extend <PROGRAM_ID> <BYTES>
```

### Transaction Monitoring
```bash
# View logs
solana logs
solana logs <PROGRAM_ID>

# Confirm transaction
solana confirm <SIGNATURE>
solana confirm -v <SIGNATURE>  # Verbose

# Get transaction
solana transaction-history <ADDRESS>
```

## Anchor Commands

### Project Management
```bash
# Initialize new project
anchor init <PROJECT_NAME>

# Add new program
anchor new <PROGRAM_NAME>

# Upgrade Anchor
anchor upgrade
```

### Building & Testing
```bash
# Build
anchor build
anchor build --verifiable  # Verifiable build

# Test
anchor test
anchor test --skip-local-validator  # Use configured cluster
anchor test -- --nocapture         # Show println! output

# IDL
anchor idl init <PROGRAM_ID> -f target/idl/nft.json
anchor idl upgrade <PROGRAM_ID> -f target/idl/nft.json
```

### Deployment
```bash
# Deploy
anchor deploy
anchor deploy --provider.cluster devnet
anchor deploy --provider.cluster mainnet

# Verify
anchor verify <PROGRAM_ID>
```

## Frontend Commands

### Development
```bash
cd app

# Start dev server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Type check
yarn tsc --noEmit
```

### Package Management
```bash
# Install dependencies
yarn install

# Add package
yarn add <package>
yarn add -D <package>  # Dev dependency

# Update packages
yarn upgrade
yarn upgrade-interactive

# Remove package
yarn remove <package>
```

### Linting & Formatting
```bash
# From root
yarn lint              # Check formatting
yarn lint:fix          # Fix formatting

# From app
yarn tsc --noEmit     # Type check
```

## Git Commands

### Basic Workflow
```bash
# Status
git status

# Add files
git add .
git add <file>

# Commit
git commit -m "message"

# Push
git push origin main

# Pull
git pull origin main
```

### Branching
```bash
# Create branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

## Debugging Commands

### Anchor Debugging
```bash
# Verbose build
ANCHOR_LOG=true anchor build

# Verbose test
ANCHOR_LOG=true anchor test

# Show IDL
cat target/idl/nft.json | jq

# Check program size
ls -lh target/deploy/*.so
```

### Frontend Debugging
```bash
cd app

# Check bundle size
yarn build
ls -lh dist/assets/

# Analyze bundle
yarn add -D rollup-plugin-visualizer
# Add to vite.config.ts and rebuild
```

### Solana Debugging
```bash
# Get recent blockhash
solana block-height

# Get slot
solana slot

# Get epoch info
solana epoch-info

# Get validators
solana validators

# Get cluster version
solana cluster-version
```

## Performance Commands

### Frontend Performance
```bash
cd app

# Build with analysis
yarn build --mode production

# Check bundle size
du -sh dist/

# Lighthouse audit (requires Chrome)
npx lighthouse http://localhost:5173 --view
```

### Program Performance
```bash
# Check compute units
solana logs | grep "consumed"

# Profile program
anchor test -- --nocapture | grep "compute"
```

## Maintenance Commands

### Cleanup
```bash
# Clean Anchor
anchor clean

# Clean node modules
rm -rf node_modules app/node_modules
yarn install

# Clean Solana cache
rm -rf ~/.cache/solana

# Clean Cargo
cargo clean
```

### Updates
```bash
# Update Rust
rustup update

# Update Solana
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Update Anchor
cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli

# Update Node packages
yarn upgrade-interactive
```

## Useful Aliases

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
# Solana
alias sol='solana'
alias solb='solana balance'
alias sola='solana address'
alias sold='solana config set --url devnet'
alias solm='solana config set --url mainnet-beta'

# Anchor
alias ab='anchor build'
alias at='anchor test'
alias ad='anchor deploy'
alias ac='anchor clean'

# Frontend
alias yd='yarn dev'
alias yb='yarn build'
alias yi='yarn install'

# Combined
alias dev='cd app && yarn dev'
alias build='anchor build && cd app && yarn build && cd ..'
```

## Environment Variables

### Create `.env` files

**Root `.env`:**
```bash
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
ANCHOR_WALLET=~/.config/solana/id.json
```

**App `.env`:**
```bash
VITE_SOLANA_NETWORK=devnet
VITE_RPC_ENDPOINT=https://api.devnet.solana.com
```

## Troubleshooting Commands

### Common Issues
```bash
# Fix: Command not found
which solana
which anchor
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Fix: Permission denied
chmod +x ~/.local/share/solana/install/active_release/bin/*

# Fix: Port already in use
lsof -ti:5173 | xargs kill -9  # Kill process on port 5173

# Fix: Anchor version mismatch
anchor --version
cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli --force
```

## Monitoring Commands

### Real-time Monitoring
```bash
# Watch logs
solana logs -u devnet | grep <PROGRAM_ID>

# Watch balance
watch -n 5 solana balance

# Watch transactions
watch -n 10 'solana transaction-history <ADDRESS> | head -20'
```

## Backup Commands

### Backup Important Files
```bash
# Backup keypair
cp ~/.config/solana/id.json ~/backup/solana-keypair-$(date +%Y%m%d).json

# Backup program
cp target/deploy/nft.so ~/backup/nft-$(date +%Y%m%d).so

# Backup IDL
cp target/idl/nft.json ~/backup/nft-idl-$(date +%Y%m%d).json
```

## Quick Reference

### Most Used Commands
```bash
# Development cycle
anchor build && anchor test && cd app && yarn dev

# Deploy cycle
anchor build && anchor deploy && cd app && yarn build

# Clean start
anchor clean && rm -rf node_modules app/node_modules && yarn install && cd app && yarn install

# Full rebuild
anchor clean && anchor build && cd app && rm -rf dist && yarn build
```

### Emergency Commands
```bash
# Kill all node processes
pkill -f node

# Reset Solana config
rm ~/.config/solana/cli/config.yml
solana config set --url devnet

# Force reinstall
rm -rf node_modules app/node_modules yarn.lock app/yarn.lock
yarn install
```
