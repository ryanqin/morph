const uniswapLogo = require("../assets/icons/uniswap.png");

const protocols = [
  {
    id: "id-uniswapv2-demo",
    address: "0xF87ab180aF2C3DdeaFedE31e27d447CE79E0549a",
    name: "Uniswap ETH-USDC Price",
    protocolType: "ZKINDEXING",
    basic: {
      logo: uniswapLogo,
      version: "v0.0.2",
      intro: "Indexing the Real Time ETH Price in USDC based on the UniswapV2 USDC-ETH Pool.",
      links: [{name: "uniswap.org", link: "https://uniswap.org/"}, {name: "demo-uniswap-v2-idx-zkgraph", link: "https://github.com/hyperoracle/zkgraph"}]
    },
    overview: {
      indexedNetwork: "Ethereum Mainnet",
      metaApp: "ZKIndexing",
      zKVerifierContractAddress: "0xe7651c-67807",
      circuitSizeEstimation: "22",
      sourceContractAddress: "0xd3d2e2-33a17",
      startBlock: "16317568",
      zKGraphWebsite: "www.hyperoracle.io"
    },
    nodes: {
      head: ["Account", "Country/Region", "State/City"],
      data: [{
        account: "0xd3d2e2-39a17",
        countryRegion: "USA",
        StateCity: "California"
      }]
    }
  },
  {
    id: "id-auto-demo",
    address: "0xF87ab180aF2C3DdeaFedE31e27d447CE79E0549a",
    name: "AutoTrigger By ETH Price",
    protocolType: "ZKAUTOMATION",
    basic: {
      logo: uniswapLogo,
      version: "v0.0.2",
      intro: "An Automatic Contract Trigger Based on the ETH-USDC Price Fluctuation.",
      links: [{name: "uniswap.org", link: "https://uniswap.org/"}, {name: "demo-autotrigger-zkgraph", link: "https://github.com/hyperoracle/zkgraph"}]
    },
    overview: {
      indexedNetwork: "Ethereum Mainnet",
      metaApp: "ZKAutomation",
      zKVerifierContractAddress: "0x0d4306-73F4B7",
      circuitSizeEstimation: "22",
      sourceContractAddress: "0xd3d2e2-33a17",
      destinationContractAddress: "0x2bb2de-79dd9a",
      triggerContractAddress: "0xf8dc0e-37de77",
      startBlock: "16317568"
    },
    nodes: {
      head: ["Account", "Country/Region", "State/City"],
      data: [{
        account: "0xd3d2e2-39a17",
        countryRegion: "USA",
        StateCity: "California"
      }]
    }
  }
]

export default protocols;
