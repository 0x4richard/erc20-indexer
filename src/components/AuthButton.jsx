import { Button, useToast } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { trimAddress } from "../utils/format"

export default function AuthButton({ setUserAddress }) {
  const toast = useToast()
  if (!window.ethereum) {
    toast({
      title: "Please install MetaMask to continue.",
      status: "warning",
      isClosable: false,
    })
    return
  }

  const [account, setAccount] = useState()
  const [ensName, setEnsName] = useState()
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
      toast({
        title:
          "You need to allow this website to access your Ethereum account.",
        status: "error",
        isClosable: true,
      })
    }
  }

  async function loadENSName(address) {
    const ensName = await provider.lookupAddress(address)
    if (!!ensName) setEnsName(ensName)
  }

  function populateAccountAddress() {
    setUserAddress(account)
  }

  useEffect(() => {
    const setAddressToAccount = async () => {
      const walletAddress = await getAccountAddress()
      if (!!walletAddress) {
        setAccount(walletAddress.toLowerCase())
        loadENSName(walletAddress)
      }
    }

    setAddressToAccount()
  }, [])

  if (!!account) {
    return (
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={populateAccountAddress}
      >
        {!!ensName ? ensName : trimAddress(account)}
      </Button>
    )
  }

  return (
    <Button colorScheme="teal" variant="solid" onClick={connectAccount}>
      Connect Wallet
    </Button>
  )
}
