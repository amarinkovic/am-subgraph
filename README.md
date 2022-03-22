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

Deploy your subgraph to studio

```
graph deploy --studio am-nayms-test
```

Deploy subgraph to local node
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