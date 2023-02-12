import { Alchemy, Network } from "alchemy-sdk"

export function useAlchemyClient() {
  const config = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  }

  return new Alchemy(config)
}
