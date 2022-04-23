/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePrint = /* GraphQL */ `
  subscription OnCreatePrint($owner: String) {
    onCreatePrint(owner: $owner) {
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
export const onUpdatePrint = /* GraphQL */ `
  subscription OnUpdatePrint {
    onUpdatePrint {
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
export const onDeletePrint = /* GraphQL */ `
  subscription OnDeletePrint {
    onDeletePrint {
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
export const onCreatePrinter = /* GraphQL */ `
  subscription OnCreatePrinter($owner: String) {
    onCreatePrinter(owner: $owner) {
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
export const onUpdatePrinter = /* GraphQL */ `
  subscription OnUpdatePrinter($owner: String) {
    onUpdatePrinter(owner: $owner) {
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
export const onDeletePrinter = /* GraphQL */ `
  subscription OnDeletePrinter($owner: String) {
    onDeletePrinter(owner: $owner) {
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
