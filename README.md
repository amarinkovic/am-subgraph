# Simple Subgraph Example

This repository contains a dummy PoC demonstrating an implementation of a subgraph for a simple smart contract based on [The Graph](https://thegraph.com/), exposing the data as a GraphQL API.

## Local Graph Node

Run locally graph node with IPFS and Postgres in docker compose containers.

```shell
docker-compose --env-file .env up -d && docker-compose logs -f
```

Tear it down

```shell
docker-compose down && rm -rf ./data
```

## Subgraph Deployment

First off, you should generate the code based on your specs:

```shell
yarn codegen
```

This will create the bindings for the contract and it's events in the `generated` folder.

After that you want to build the subgraph, to make sure your mapping scripts are correct.

```shell
yarn build
```

If you are working with a local graph node and you havent created your graph so far. You need to do that to able to deploy it.

```shell
yarn create-local
```

Now you are ready do deploy the subgraph you just created.


Deploy your subgraph to studio with this command.

```shell
graph deploy --studio am-subgraph
```

Similarly deploy your subgraph to local node with:

```shell
graph deploy --debug --node http://127.0.0.1:8020/ --ipfs http://localhost:5001 am-subgraph
```

deploy to localnode via npm/yarn:

```shell
yarn deploy-local
```

## Miscellaneous

Check the size of the data folder

```shell
du -hd1
```

You should be able to monitor the indexing status of your subgraph on this [URL](http://localhost:8000/subgraphs/graphql) with the GraphQL query bellow:

```GraphQL
{
  subgraphs {
    name
    currentVersion {
      deployment {
        synced # Is the subgraph synced
        failed # Did the subgraph failed while indexing
        latestEthereumBlockNumber # The latest block the the subgraph knows to exists
        totalEthereumBlocksCount # The latest block the finished indexing
      }
    }
  }
}
```

Sample query for the `MyMessageEntity` run it on [GraphiQL](http://localhost:8000/subgraphs/name/am-subgraph):

```GraphQL
{
  myMessageEntities(first: 5) {
    id
    messageId
    message
  }
}
```

Check the size of data folder:

```shell
du -hd1 data
```
