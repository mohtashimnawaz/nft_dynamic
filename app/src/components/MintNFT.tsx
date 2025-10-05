import { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor'
import { Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { motion, AnimatePresence } from 'framer-motion'
import idl from '../../../target/idl/nft.json'

const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')

export default function MintNFT() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [uri, setUri] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  const [minting, setMinting] = useState(false)

  useEffect(() => {
    // Create stars
    const starsContainer = document.querySelector('.stars')
    if (starsContainer && starsContainer.children.length === 0) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.animationDelay = `${Math.random() * 3}s`
        starsContainer.appendChild(star)
      }
    }
  }, [])

  const getProvider = () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected')
    }
    return new AnchorProvider(connection, wallet as any, {
      commitment: 'confirmed',
    })
  }

  const mintNFT = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!wallet.publicKey) {
      setStatus({ type: 'error', message: 'Please connect your wallet first' })
      return
    }

    if (!name || !symbol || !uri) {
      setStatus({ type: 'error', message: 'Please fill in all fields' })
      return
    }

    setMinting(true)
    setStatus({ type: 'info', message: 'Minting your NFT...' })

    try {
      const provider = getProvider()
      const program = new Program(idl as Idl, provider)

      const mintKeypair = Keypair.generate()

      const [metadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )

      const [masterEdition] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
          Buffer.from('edition'),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )

      const [tokenAccount] = PublicKey.findProgramAddressSync(
        [
          wallet.publicKey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      )

      const tx = await program.methods
        .mintNft(name, symbol, uri)
        .accounts({
          payer: wallet.publicKey,
          mint: mintKeypair.publicKey,
          tokenAccount,
          metadata,
          masterEdition,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([mintKeypair])
        .rpc()

      setStatus({
        type: 'success',
        message: (
          <div>
            NFT minted successfully!<br />
            <a
              href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-link"
            >
              View on Solana Explorer
            </a>
            <br />
            Mint: {mintKeypair.publicKey.toString()}
          </div>
        ) as any,
      })

      setName('')
      setSymbol('')
      setUri('')
    } catch (error: any) {
      console.error('Error minting NFT:', error)
      setStatus({
        type: 'error',
        message: `Failed to mint NFT: ${error.message || 'Unknown error'}`,
      })
    } finally {
      setMinting(false)
    }
  }

  return (
    <>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            🎨 NFT Minter
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Create your own Solana NFT with style
          </motion.p>

          <motion.div 
            className="wallet-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <WalletMultiButton />
          </motion.div>

          <AnimatePresence>
            {wallet.publicKey && (
              <motion.form 
                onSubmit={mintNFT}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="form-group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label htmlFor="name">NFT Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="My Awesome NFT"
                    maxLength={32}
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <label htmlFor="symbol">Symbol</label>
                  <input
                    id="symbol"
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="MNFT"
                    maxLength={10}
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <label htmlFor="uri">Metadata URI</label>
                  <textarea
                    id="uri"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                    placeholder="https://arweave.net/..."
                  />
                </motion.div>

                <motion.button 
                  type="submit" 
                  className="mint-button" 
                  disabled={minting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {minting ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      Minting...
                    </motion.span>
                  ) : (
                    'Mint NFT'
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {status && (
              <motion.div 
                className={`status ${status.type}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}
