import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react"
import { Utils } from "alchemy-sdk"

export default function TokenDetail({ tokenBalance, tokenData }) {
  return (
    <Card>
      <CardHeader>
        <HStack>
          {tokenData.logo && <Image src={tokenData.logo} width={3} />}
          <Heading size="xs">{tokenData.name}</Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text>
          <b>Symbol:&nbsp;&nbsp;</b> {tokenData.symbol}
        </Text>
        <Text>
          <b>Balance:&nbsp;&nbsp;</b>
          {Utils.formatUnits(tokenBalance, tokenData.decimals)}
        </Text>
      </CardBody>
    </Card>
  )
}
