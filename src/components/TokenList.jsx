import {
  Box,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { useAlchemyClient } from "../hooks/useAlchemyClient"
import { useQuery } from "react-query"
import { useEffect } from "react"
import TokenDetail from "./TokenDetail"

export default function TokenList({ userAddress, setIsTokenLoading }) {
  async function getTokenBalance() {
    const alchemy = useAlchemyClient()

    const { tokenBalances } = await alchemy.core.getTokenBalances(userAddress)

    const tokenDataPromises = []

    for (let i = 0; i < tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        tokenBalances[i].contractAddress
      )
      tokenDataPromises.push(tokenData)
    }

    return {
      tokenBalances,
      tokenDataObjects: await Promise.all(tokenDataPromises),
    }
  }

  const { data, isSuccess, isLoading, isError, error } = useQuery(
    ["tokenBalance", userAddress],
    getTokenBalance,
    { enabled: !!userAddress }
  )

  useEffect(() => {
    setIsTokenLoading(isLoading)
  }, [isLoading])

  return (
    <>
      {isLoading && (
        <Box mt={10}>
          <Spinner color="red.500" size="xl" />
        </Box>
      )}

      {isError && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          width="600px"
          mt={10}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <Box>
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Error
            </AlertTitle>
            <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
          </Box>
        </Alert>
      )}

      {isSuccess && (
        <SimpleGrid
          mt={10}
          spacing={3}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {data.tokenBalances.map((e, i) => {
            return (
              <TokenDetail
                key={i}
                tokenBalance={e.tokenBalance}
                tokenData={data.tokenDataObjects[i]}
              />
            )
          })}
        </SimpleGrid>
      )}
    </>
  )
}
