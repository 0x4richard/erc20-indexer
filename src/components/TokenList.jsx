import { Heading, Box, Flex, Image, SimpleGrid } from "@chakra-ui/react"
import { Utils } from "alchemy-sdk"

export default function TokenList({ hasQueried, results, tokenDataObjects }) {
  return (
    <>
      <Heading my={36}>ERC-20 token balances:</Heading>
      {hasQueried ? (
        <SimpleGrid w={"90vw"} columns={4} spacing={24}>
          {results.tokenBalances.map((e, i) => {
            return (
              <Flex
                flexDir={"column"}
                color="white"
                bg="blue"
                w={"20vw"}
                key={e.id}
              >
                <Box>
                  <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                </Box>
                <Box>
                  <b>Balance:</b>&nbsp;
                  {Utils.formatUnits(
                    e.tokenBalance,
                    tokenDataObjects[i].decimals
                  )}
                </Box>
                <Image src={tokenDataObjects[i].logo} />
              </Flex>
            )
          })}
        </SimpleGrid>
      ) : (
        "Please make a query! This may take a few seconds..."
      )}
    </>
  )
}
