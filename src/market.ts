import { BigInt } from "@graphprotocol/graph-ts"
import {
    BuyNFT as BuyNFTEvent,
    CancelSalesOrder as CancelSalesOrderEvent,
    SellNFT as SellNFTEvent
} from "../generated/CBomberMarket/CBomberMarketABI"
import {
    BuyNFT,
    CancelSalesOrder,
    SellNFT,
    NFTOrder,
    TokenActivity
} from "../generated/schema"

export function handleSellNFT(event: SellNFTEvent): void {
    let entity = new SellNFT(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity._index = event.params._id
    entity._nftAddress = event.params._nftAddress
    entity._tokenid = event.params._tokenid
    entity._number = event.params._number
    entity._minSalePriceInWei = event.params._minSalePriceInWei
    entity._isToken = event.params._isToken
    entity._onlySellTo = event.params._onlySellTo
    entity.time = event.params.time
    entity.account = event.transaction.from
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()


    let order = new NFTOrder(event.params._id.toString());
    order.nftAddress = event.params._nftAddress;
    order.tokenId = event.params._tokenid;
    order.isToken = event.params._isToken;
    order.number = event.params._number;
    order.minPrice = event.params._minSalePriceInWei;
    order.onlySellTo = event.params._onlySellTo;
    order.status = "Sale";
    order.account = event.transaction.from
    order.createdAt = event.block.timestamp;
    order.updatedAt = event.block.timestamp;

    order.save();

    let tokenActivitySell = new TokenActivity(order.tokenId.toString() + "-" + event.transaction.from.toHex());
    tokenActivitySell.tokenId = order.tokenId;
    tokenActivitySell.nftAddress = order.nftAddress;
    tokenActivitySell.activityType = "Sale";
    tokenActivitySell.number = event.params._number;
    tokenActivitySell.account = event.transaction.from;
    tokenActivitySell.timestamp = event.block.timestamp;
    tokenActivitySell.save();

}

export function handleCancelSalesOrder(event: CancelSalesOrderEvent): void {
    let entity = new CancelSalesOrder(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity._index = event.params._index
    entity.seller = event.params.seller
    entity.time = event.params.time

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()

    let order = NFTOrder.load(event.params._index.toString());
    if (order) {
        order.number = BigInt.fromI32(0); //order.number.minus(BigInt.fromI32(1))
        order.status = "Cancel";
        order.cancelledAt = event.block.timestamp;
        order.save();

        let tokenActivitySell = new TokenActivity(order.tokenId.toString() + "-" + event.params.seller.toHex());
        tokenActivitySell.tokenId = order.tokenId;
        tokenActivitySell.nftAddress = order.nftAddress;
        tokenActivitySell.activityType = "Cancel";
        tokenActivitySell.number = BigInt.fromI32(0);
        tokenActivitySell.account = event.params.seller;
        tokenActivitySell.timestamp = event.block.timestamp;
        tokenActivitySell.save();

    }


}

export function handleBuyNFT(event: BuyNFTEvent): void {
    let entity = new BuyNFT(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity._index = event.params._index
    entity.account = event.params.account
    entity.time = event.params.time

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()

    let order = NFTOrder.load(event.params._index.toString());
    if (order) {
        order.number = order.number.minus(BigInt.fromI32(1))
        order.updatedAt = event.block.timestamp;

        order.save();

        let tokenActivitySell = new TokenActivity(order.tokenId.toString() + "-" + event.params.account.toHex());
        tokenActivitySell.tokenId = order.tokenId;
        tokenActivitySell.nftAddress = order.nftAddress;
        tokenActivitySell.activityType = "Buy";
        tokenActivitySell.number = BigInt.fromI32(1);
        tokenActivitySell.account = event.params.account;
        tokenActivitySell.timestamp = event.block.timestamp;

        tokenActivitySell.save();
    }
}
