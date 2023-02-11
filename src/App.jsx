import { Box, Center, Flex } from "@chakra-ui/react"
import { Alchemy, Network } from "alchemy-sdk"
import { useState } from "react"
import Header from "./components/Header"
import Search from "./components/Search"
import TokenList from "./components/TokenList"

function App() {
  const [userAddress, setUserAddress] = useState("")
  const [results, setResults] = useState([])
  const [hasQueried, setHasQueried] = useState(false)
  const [tokenDataObjects, setTokenDataObjects] = useState([])

  async function getTokenBalance() {
    const config = {
      apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    }

    const alchemy = new Alchemy(config)
    const data = await alchemy.core.getTokenBalances(userAddress)

    setResults(data)

    const tokenDataPromises = []

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      )
      tokenDataPromises.push(tokenData)
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises))
    setHasQueried(true)
  }
  return (
    <Box w="100vw">
      <Center>
        <Header />
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        <Search
          setUserAddress={setUserAddress}
          getTokenBalance={getTokenBalance}
        />
        <TokenList
          hasQueried={hasQueried}
          results={results}
          tokenDataObjects={tokenDataObjects}
        />
      </Flex>
    </Box>
  )
}

export default App
