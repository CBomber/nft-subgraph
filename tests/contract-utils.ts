import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AddProduct,
  Buy,
  OwnershipTransferred,
  SetDevFundAddress,
  SetPaymentTokenAddress,
  SetProductState,
  UpdateProduct
} from "../generated/Contract/Contract"

export function createAddProductEvent(
  _id: BigInt,
  _tokenId: BigInt,
  _nftAddress: Address,
  _total: BigInt,
  _price: BigInt,
  _isToken: boolean
): AddProduct {
  let addProductEvent = changetype<AddProduct>(newMockEvent())

  addProductEvent.parameters = new Array()

  addProductEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )
  addProductEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  addProductEvent.parameters.push(
    new ethereum.EventParam(
      "_nftAddress",
      ethereum.Value.fromAddress(_nftAddress)
    )
  )
  addProductEvent.parameters.push(
    new ethereum.EventParam("_total", ethereum.Value.fromUnsignedBigInt(_total))
  )
  addProductEvent.parameters.push(
    new ethereum.EventParam("_price", ethereum.Value.fromUnsignedBigInt(_price))
  )
  addProductEvent.parameters.push(
    new ethereum.EventParam("_isToken", ethereum.Value.fromBoolean(_isToken))
  )

  return addProductEvent
}

export function createBuyEvent(
  _account: Address,
  _nft: Address,
  _tokenID: BigInt,
  _productId: BigInt
): Buy {
  let buyEvent = changetype<Buy>(newMockEvent())

  buyEvent.parameters = new Array()

  buyEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )
  buyEvent.parameters.push(
    new ethereum.EventParam("_nft", ethereum.Value.fromAddress(_nft))
  )
  buyEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenID",
      ethereum.Value.fromUnsignedBigInt(_tokenID)
    )
  )
  buyEvent.parameters.push(
    new ethereum.EventParam(
      "_productId",
      ethereum.Value.fromUnsignedBigInt(_productId)
    )
  )

  return buyEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSetDevFundAddressEvent(
  newAddress: Address
): SetDevFundAddress {
  let setDevFundAddressEvent = changetype<SetDevFundAddress>(newMockEvent())

  setDevFundAddressEvent.parameters = new Array()

  setDevFundAddressEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return setDevFundAddressEvent
}

export function createSetPaymentTokenAddressEvent(
  _address: Address
): SetPaymentTokenAddress {
  let setPaymentTokenAddressEvent = changetype<SetPaymentTokenAddress>(
    newMockEvent()
  )

  setPaymentTokenAddressEvent.parameters = new Array()

  setPaymentTokenAddressEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return setPaymentTokenAddressEvent
}

export function createSetProductStateEvent(
  _id: BigInt,
  _state: boolean
): SetProductState {
  let setProductStateEvent = changetype<SetProductState>(newMockEvent())

  setProductStateEvent.parameters = new Array()

  setProductStateEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )
  setProductStateEvent.parameters.push(
    new ethereum.EventParam("_state", ethereum.Value.fromBoolean(_state))
  )

  return setProductStateEvent
}

export function createUpdateProductEvent(
  _id: BigInt,
  _tokenId: BigInt,
  _nftAddress: Address,
  _total: BigInt,
  _price: BigInt,
  _isToken: boolean
): UpdateProduct {
  let updateProductEvent = changetype<UpdateProduct>(newMockEvent())

  updateProductEvent.parameters = new Array()

  updateProductEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )
  updateProductEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  updateProductEvent.parameters.push(
    new ethereum.EventParam(
      "_nftAddress",
      ethereum.Value.fromAddress(_nftAddress)
    )
  )
  updateProductEvent.parameters.push(
    new ethereum.EventParam("_total", ethereum.Value.fromUnsignedBigInt(_total))
  )
  updateProductEvent.parameters.push(
    new ethereum.EventParam("_price", ethereum.Value.fromUnsignedBigInt(_price))
  )
  updateProductEvent.parameters.push(
    new ethereum.EventParam("_isToken", ethereum.Value.fromBoolean(_isToken))
  )

  return updateProductEvent
}
