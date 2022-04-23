/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const cogniprintAiFunction = /* GraphQL */ `
  query CogniprintAiFunction($imageKeys: [String!]!) {
    CogniprintAIFunction(imageKeys: $imageKeys)
  }
`;
export const getPrint = /* GraphQL */ `
  query GetPrint($id: ID!) {
    getPrint(id: $id) {
      owner
      id
      printerID
      failure
      printerStates {
        createdAt
        owner
        printID
        picture {
          bucket
          region
          key
        }
        progress
        failure {
          currentPred
          previousPred
        }
        temps {
          head {
            currentTemp
            goalTemp
          }
          bed {
            currentTemp
            goalTemp
          }
        }
        timeRemaining
        printTime
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPrints = /* GraphQL */ `
  query ListPrints(
    $filter: ModelPrintFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        owner
        id
        printerID
        failure
        printerStates {
          createdAt
          owner
          printID
          picture {
            bucket
            region
            key
          }
          progress
          failure {
            currentPred
            previousPred
          }
          temps {
            head {
              currentTemp
              goalTemp
            }
            bed {
              currentTemp
              goalTemp
            }
          }
          timeRemaining
          printTime
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrinter = /* GraphQL */ `
  query GetPrinter($id: ID!) {
    getPrinter(id: $id) {
      updatedAt
      printerState {
        createdAt
        owner
        printID
        picture {
          bucket
          region
          key
        }
        progress
        failure {
          currentPred
          previousPred
        }
        temps {
          head {
            currentTemp
            goalTemp
          }
          bed {
            currentTemp
            goalTemp
          }
        }
        timeRemaining
        printTime
      }
      status
      owner
      id
      picture {
        bucket
        region
        key
      }
      name
      notifyOnFail
      pauseOnFail
      sensitivity
    }
  }
`;
export const listPrinters = /* GraphQL */ `
  query ListPrinters(
    $filter: ModelPrinterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrinters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        updatedAt
        printerState {
          createdAt
          owner
          printID
          picture {
            bucket
            region
            key
          }
          progress
          failure {
            currentPred
            previousPred
          }
          temps {
            head {
              currentTemp
              goalTemp
            }
            bed {
              currentTemp
              goalTemp
            }
          }
          timeRemaining
          printTime
        }
        status
        owner
        id
        picture {
          bucket
          region
          key
        }
        name
        notifyOnFail
        pauseOnFail
        sensitivity
      }
      nextToken
    }
  }
`;
export const printersByOwner = /* GraphQL */ `
  query PrintersByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelPrinterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    printersByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        updatedAt
        printerState {
          createdAt
          owner
          printID
          picture {
            bucket
            region
            key
          }
          progress
          failure {
            currentPred
            previousPred
          }
          temps {
            head {
              currentTemp
              goalTemp
            }
            bed {
              currentTemp
              goalTemp
            }
          }
          timeRemaining
          printTime
        }
        status
        owner
        id
        picture {
          bucket
          region
          key
        }
        name
        notifyOnFail
        pauseOnFail
        sensitivity
      }
      nextToken
    }
  }
`;
export const printersByOwnerById = /* GraphQL */ `
  query PrintersByOwnerById(
    $owner: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPrinterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    printersByOwnerById(
      owner: $owner
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        updatedAt
        printerState {
          createdAt
          owner
          printID
          picture {
            bucket
            region
            key
          }
          progress
          failure {
            currentPred
            previousPred
          }
          temps {
            head {
              currentTemp
              goalTemp
            }
            bed {
              currentTemp
              goalTemp
            }
          }
          timeRemaining
          printTime
        }
        status
        owner
        id
        picture {
          bucket
          region
          key
        }
        name
        notifyOnFail
        pauseOnFail
        sensitivity
      }
      nextToken
    }
  }
`;
