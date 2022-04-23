/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPrint = /* GraphQL */ `
  mutation CreatePrint(
    $input: CreatePrintInput!
    $condition: ModelPrintConditionInput
  ) {
    createPrint(input: $input, condition: $condition) {
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
export const updatePrint = /* GraphQL */ `
  mutation UpdatePrint(
    $input: UpdatePrintInput!
    $condition: ModelPrintConditionInput
  ) {
    updatePrint(input: $input, condition: $condition) {
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
export const deletePrint = /* GraphQL */ `
  mutation DeletePrint(
    $input: DeletePrintInput!
    $condition: ModelPrintConditionInput
  ) {
    deletePrint(input: $input, condition: $condition) {
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
export const createPrinter = /* GraphQL */ `
  mutation CreatePrinter(
    $input: CreatePrinterInput!
    $condition: ModelPrinterConditionInput
  ) {
    createPrinter(input: $input, condition: $condition) {
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
export const updatePrinter = /* GraphQL */ `
  mutation UpdatePrinter(
    $input: UpdatePrinterInput!
    $condition: ModelPrinterConditionInput
  ) {
    updatePrinter(input: $input, condition: $condition) {
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
export const deletePrinter = /* GraphQL */ `
  mutation DeletePrinter(
    $input: DeletePrinterInput!
    $condition: ModelPrinterConditionInput
  ) {
    deletePrinter(input: $input, condition: $condition) {
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
