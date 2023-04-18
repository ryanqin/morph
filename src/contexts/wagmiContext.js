import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import {infuraProvider } from 'wagmi/providers/infura'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'


// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
    [mainnet],
    [infuraProvider({ apiKey: '66bdab690554486092111f634a9e891c' })],
)

// Set up client
const client = createClient({

    connectors: [
        new MetaMaskConnector({ chains ,  options: {
                shimDisconnect: true,
                UNSTABLE_shimOnConnectSelectAccount: true
            }}),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                qrcode: true,
                projectId: '...',
            },
        }),
    ],
    provider,
    webSocketProvider,
})


const WagmiProvider = ({children}) =>{

    return <WagmiConfig client={client}>
        {children}
    </WagmiConfig>
}


export default WagmiProvider;