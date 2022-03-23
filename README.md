# Local Graph Node

Run locally graph node with IPFS and Postgres in docker compose containers.

```
docker-compose up -d && docker-compose logs -f
```

Tear it down
```
docker-compose down && rm -rf ./data
```

# Subgraph Deployment

First off, you should generate the code based on your specs:
```
yarn codegen
```
This will create the bindings for the contract and it's events in the `generated` folder.

After that you want to build the subgraph, to make sure your mapping scripts are correct.
```
yarn build
```

If you are working with a local graph node and you havent created your graph so far. You need to do that to able to deploy it.
```
yarn create-local
```

Now you are ready do deploy the subgraph you just created.


Deploy your subgraph to studio with this command.

```
graph deploy --studio am-nayms-test
```

Similarly deploy your subgraph to local node with:
```
graph deploy --debug --node http://127.0.0.1:8020/ --ipfs http://localhost:5001 am-nayms-test
```

deploy to localnode via npm/yarn:

```
yarn deploy-local
```

# Miscellaneous

Check the size of the data folder
```
du -hd1
```

You should be able to monitor the indexing status of your subgraph on this [URL](http://localhost:8000/subgraphs/graphql) with the GraphQL query bellow:
```
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

Sample query for the `MyMessageEntity` run it on [GraphiQL](http://localhost:8000/subgraphs/name/am-nayms-test):
```
{
  myMessageEntities(first: 5) {
    id
    messageId
    message
  }
}
```