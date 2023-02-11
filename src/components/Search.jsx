import { Heading, Input, Button } from "@chakra-ui/react"

export default function Search({ setUserAddress, getTokenBalance }) {
  return (
    <>
      <Heading mt={42}>
        Get all the ERC-20 token balances of this address:
      </Heading>
      <Input
        onChange={(e) => setUserAddress(e.target.value)}
        color="black"
        w="600px"
        textAlign="center"
        p={4}
        bgColor="white"
        fontSize={24}
      />
      <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="blue">
        Check ERC-20 Token Balances
      </Button>
    </>
  )
}
