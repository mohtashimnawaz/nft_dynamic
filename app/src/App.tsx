import { useMemo, Suspense, useState } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import MintNFT from './components/MintNFT'
import Scene3D from './components/Scene3D'
import '@solana/wallet-adapter-react-ui/styles.css'
import './App.css'
import './components/LandingPage.css'

function App() {
  const [showMinter, setShowMinter] = useState(false)
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="bg-gradient"></div>
          <div className="stars"></div>

          <div className="canvas-container">
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </div>

          <AnimatePresence mode="wait">
            {!showMinter ? (
              <LandingPage key="landing" onGetStarted={() => setShowMinter(true)} />
            ) : (
              <MintNFT key="minter" />
            )}
          </AnimatePresence>

          {showMinter && (
            <button
              className="back-button"
              onClick={() => setShowMinter(false)}
              title="Back to Home"
            >
              ← Back
            </button>
          )}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
