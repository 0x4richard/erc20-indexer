import { Input, Button, Stack } from "@chakra-ui/react"
import { useState } from "react"

export default function Search({ setUserAddress, isTokenLoading }) {
  const [address, setAddress] = useState("")

  return (
    <Stack>
      <Input
        onChange={(e) => setAddress(e.target.value)}
        color="black"
        w="600px"
        textAlign="center"
        p={4}
        bgColor="white"
        fontSize={24}
        placeholder="Enter address or ENS name."
      />
      <Button
        fontSize={20}
        onClick={(e) => setUserAddress(address)}
        colorScheme="blue"
        disabled={isTokenLoading}
      >
        {isTokenLoading ? "Loading..." : "Check ERC-20 Token Balances"}
      </Button>
    </Stack>
  )
}
