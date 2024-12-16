import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AddProduct } from "../generated/schema"
import { AddProduct as AddProductEvent } from "../generated/Contract/Contract"
import { handleAddProduct } from "../src/contract"
import { createAddProductEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _id = BigInt.fromI32(234)
    let _tokenId = BigInt.fromI32(234)
    let _nftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _total = BigInt.fromI32(234)
    let _price = BigInt.fromI32(234)
    let _isToken = "boolean Not implemented"
    let newAddProductEvent = createAddProductEvent(
      _id,
      _tokenId,
      _nftAddress,
      _total,
      _price,
      _isToken
    )
    handleAddProduct(newAddProductEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddProduct created and stored", () => {
    assert.entityCount("AddProduct", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddProduct",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_id",
      "234"
    )
    assert.fieldEquals(
      "AddProduct",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_tokenId",
      "234"
    )
    assert.fieldEquals(
      "AddProduct",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_nftAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddProduct",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_total",
      "234"
    )
    assert.fieldEquals(
      "AddProduct",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_price",
      "234"
    )
    assert.fieldEquals(
      "AddProduct",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_isToken",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
