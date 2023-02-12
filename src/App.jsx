import { Box, Center, Flex } from "@chakra-ui/react"
import { useState } from "react"
import Header from "./components/Header"
import Search from "./components/Search"
import TokenList from "./components/TokenList"
import { QueryClient, QueryClientProvider } from "react-query"
import AuthButton from "./components/AuthButton"

function App() {
  const [userAddress, setUserAddress] = useState("")
  const [isTokenLoading, setIsTokenLoading] = useState(false)
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Box w="100vw">
        <Box position="fixed" top="10px" right="10px">
          <AuthButton />
        </Box>
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
            isTokenLoading={isTokenLoading}
          />
          <TokenList
            userAddress={userAddress}
            setIsTokenLoading={setIsTokenLoading}
          />
        </Flex>
      </Box>
    </QueryClientProvider>
  )
}

export default App
