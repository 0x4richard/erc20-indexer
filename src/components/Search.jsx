import { Heading, Input, Button } from "@chakra-ui/react"
import { useState } from "react"

export default function Search({ setUserAddress, isTokenLoading }) {
  const [address, setAddress] = useState("")

  return (
    <>
      <Heading mt={42}>
        Get all the ERC-20 token balances of this address:
      </Heading>
      <Input
        onChange={(e) => setAddress(e.target.value)}
        color="black"
        w="600px"
        textAlign="center"
        p={4}
        bgColor="white"
        fontSize={24}
      />
      <Button
        fontSize={20}
        onClick={(e) => setUserAddress(address)}
        mt={36}
        bgColor="blue"
        disabled={isTokenLoading}
      >
        {isTokenLoading ? "Loading..." : "Check ERC-20 Token Balances"}
      </Button>
    </>
  )
}
