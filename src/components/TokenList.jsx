import { Heading, Box, Flex, Image, SimpleGrid } from "@chakra-ui/react"
import { Utils } from "alchemy-sdk"
import { useAlchemyClient } from "../hooks/useAlchemyClient"
import { useQuery } from "react-query"
import { useEffect } from "react"

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
      {isLoading && <Box>Loading...</Box>}
      {isError && <Box>Error: {error.message}</Box>}
      {isSuccess && (
        <>
          <Heading my={36}>ERC-20 token balances:</Heading>
          <SimpleGrid w={"90vw"} columns={4} spacing={24}>
            {data.tokenBalances.map((e, i) => {
              return (
                <Flex
                  flexDir={"column"}
                  color="white"
                  bg="blue"
                  w={"20vw"}
                  key={i}
                >
                  <Box>
                    <b>Symbol:</b> ${data.tokenDataObjects[i].symbol}&nbsp;
                  </Box>
                  <Box>
                    <b>Balance:</b>&nbsp;
                    {Utils.formatUnits(
                      e.tokenBalance,
                      data.tokenDataObjects[i].decimals
                    )}
                  </Box>
                  <Image src={data.tokenDataObjects[i].logo} />
                </Flex>
              )
            })}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
