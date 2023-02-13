import { Input, Button, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function Search({
  userAddress,
  setUserAddress,
  isTokenLoading,
}) {
  const [address, setAddress] = useState("")

  useEffect(() => {
    setAddress(userAddress)
  }, [userAddress])

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
        value={address}
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
