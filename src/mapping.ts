import { BigInt } from "@graphprotocol/graph-ts"
import { MyMessenger, MyMessage } from "../generated/MyMessenger/MyMessenger"
import { MyMessageEntity, ContractEntity } from "../generated/schema"

export function handleMyMessage(event: MyMessage): void {

  let contractEntity = ContractEntity.load("contract")
  if(!contractEntity) {
    contractEntity = new ContractEntity("contract")
  }
  
  const contract = MyMessenger.bind(event.address);
  contractEntity.count = contract.getCounter()
  contractEntity.save()
  
  let msgEntity = MyMessageEntity.load(event.params.messageId.toString())
  if(!msgEntity) {
    msgEntity = new MyMessageEntity(event.params.messageId.toString())
  }
  msgEntity.messageId = event.params.messageId
  msgEntity.message = event.params.message

  msgEntity.save()

}
