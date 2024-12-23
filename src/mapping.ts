import { BigInt } from "@graphprotocol/graph-ts"
import {
  AddProduct as AddProductEvent,
  Buy as BuyEvent, 
  SetProductState as SetProductStateEvent,
  UpdateProduct as UpdateProductEvent
  
} from "../generated/CBomberShop/CBomberShopABI"
import {
  AddProduct,
  Buy, 
  Product, 
  SetProductState,
  UpdateProduct,
  
} from "../generated/schema"

export function handleAddProduct(event: AddProductEvent): void {
  let entity = new AddProduct(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._productId = event.params._id
  entity._tokenId = event.params._tokenId
  entity._nftAddress = event.params._nftAddress
  entity._total = event.params._total
  entity._price = event.params._price
  entity._isToken = event.params._isToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let product = new Product(event.params._id.toString())

  product.productId = event.params._id
  product.tokenId = event.params._tokenId
  product.nftAddress = event.params._nftAddress
  product.total = event.params._total
  product.sold = BigInt.fromI32(0)  // Initially no products sold
  product.price = event.params._price
  product.isToken = event.params._isToken
  product.state = true  // Product is available when added
  product.createdAt = event.block.timestamp

  product.save()

}

export function handleSetProductState(event: SetProductStateEvent): void {
  let entity = new SetProductState(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._productId = event.params._id
  entity._state = event.params._state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let product = Product.load(event.params._id.toString())
  if (product == null) {
    return // If product does not exist, do nothing
  }

  product.state = event.params._state  // Update the product's state

  product.save() 
}

export function handleUpdateProduct(event: UpdateProductEvent): void {
  let entity = new UpdateProduct(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._productId = event.params._id
  entity._tokenId = event.params._tokenId
  entity._nftAddress = event.params._nftAddress
  entity._total = event.params._total
  entity._price = event.params._price
  entity._isToken = event.params._isToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

 
  let product = Product.load(event.params._id.toString())

  if (product == null) {
    return // If product does not exist, do nothing
  }

  product.productId = event.params._id
  product.tokenId = event.params._tokenId
  product.nftAddress = event.params._nftAddress
  product.total = event.params._total
  product.price = event.params._price
  product.isToken = event.params._isToken

  product.save()
}

export function handleBuy(event: BuyEvent): void {
  let entity = new Buy(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity._account = event.params._account
  entity._nft = event.params._nft
  entity._tokenID = event.params._tokenID
  entity._productId = event.params._productId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()


  let product = Product.load(event.params._productId.toString())

  if (product == null) {
    return // If product does not exist, do nothing
  }

  product.sold = product.sold.plus(BigInt.fromI32(1))  // Increment the sold count
  product.save()

}