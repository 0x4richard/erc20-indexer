import { Button } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function AuthButton() {
  if (!window.ethereum) {
    alert("Please install MetaMask to continue.")
    return
  }

  const [account, setAccount] = useState()
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  async function getAccountAddress() {
    const accounts = await provider.listAccounts()
    return accounts[0]
  }

  async function connectAccount() {
    try {
      const data = await window.ethereum.send("eth_requestAccounts")
      setAccount(data.result[0])
    } catch (err) {
      alert("You need to allow this website to access your Ethereum account.")
    }
  }

  useEffect(() => {
    const setAddressToAccount = async () => {
      const walletAddress = await getAccountAddress()
      setAccount(walletAddress.toLowerCase())
    }

    setAddressToAccount()
  }, [])

  if (!!account) {
    return (
      <Button colorScheme="teal" variant="outline">
        {account}
      </Button>
    )
  }

  return (
    <Button colorScheme="teal" variant="solid" onClick={connectAccount}>
      Connect Wallet
    </Button>
  )
}
