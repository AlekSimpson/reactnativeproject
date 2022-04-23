import * as FileSystem from 'expo-file-system';
import { updatePrinter } from './updatePrinters.js';
import { updatePrinterDict } from './updatePrinterDict.js';
import store from './store.js';
import { Auth } from 'aws-amplify';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { printersByOwner, listPrints } from './graphql/queries'
import * as subscriptions from './graphql/subscriptions';
import { Platform } from 'react-native'

var printerImageDict = {};

var tempListPrinters = []

var isWeb = (Platform.OS === 'web' ? true : false)

//Fetches the printer data from the API
async function fetchPrinters(nextToken = null, refresh = false, sortMethod = 'Failure Risk', isResort = false)
{
    if ((refresh) && (nextToken == null))
    {
        clearStorage()
    }
    //Sorts the fetched printers
    function sortPrintersBy(method)
    {
        function sortByFailureRisk()
        {
            tempListPrinters.sort((a, b) => {
                return b.status - a.status;
            })
            tempListPrinters.sort((a, b) => {
                let aPred = ((a.printerState != null && a.printerState.failure != null && a.printerState.failure.currentPred != null) ? a.printerState.failure.currentPred : 0.0)
                let bPred = ((b.printerState != null && b.printerState.failure != null && b.printerState.failure.currentPred != null) ? b.printerState.failure.currentPred : 0.0)
                return bPred - aPred
            })
        }
        switch (method)
        {
            case 'Failure Risk':
                sortByFailureRisk()
                break 
            case 'Alphabetical Order':
                tempListPrinters.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase()
                    
                    if (fa < fb)
                    {
                        return -1
                    }
                    if (fa > fb)
                    {
                        return 1
                    }

                    return 0
                })
                break
            default: 
                //sort by failure risk by default
                sortByFailureRisk()
        }
    }

    try
    {
        const user = await Auth.currentUserInfo();
        const printerData = await API.graphql(graphqlOperation(printersByOwner, {owner: user.username, nextToken: nextToken}))
        const printers = printerData.data.printersByOwner.items
        
        let newNextToken = printerData.data.printersByOwner.nextToken
        
        tempListPrinters = tempListPrinters.concat(printers)

        if (newNextToken != null)
        {
            fetchPrinters(newNextToken, refresh, sortMethod)
        }else 
        {
            sortPrintersBy(sortMethod)

            store.dispatch(updatePrinter(tempListPrinters))
            
            if (!isResort)
            {
                let data = await checkForSavedData()
                if (data.length !== 0 && (!refresh))
                {
                    retrieveFromStorage()
                }else 
                {
                    downloadAllImages()
                }
                if (!refresh)
                {
                    //Subscribe to creation of Todo
                    const subscription = API.graphql(
                        graphqlOperation(subscriptions.onUpdatePrinter)
                    ).subscribe({
                        next: (printerData) => console.log(printerData)
                    });
                }
            }
        }
    } catch (err) { console.log(err) }

    //Adds the printer to the image dictionary
    function addToDict(key, value, save)
    {
        printerImageDict[key] = value
        if (save && !isWeb)
        {
            saveImage(key + '.jpg', value)
        }
        if (Object.keys(printerImageDict).length == tempListPrinters.length)
        {
            store.dispatch(updatePrinterDict(printerImageDict))
            printerImageDict = {}
            tempListPrinters = []
        }
    }

    //Gets the s3Image url
    function downloadImage(printer)
    {
        Storage.get(printer.picture.key, { level: 'public', customPrefix: { public: ''} })
            .then(result => addToDict(printer.id, result, true))
            .catch(err => console.log(err));
    }

    //Downloads all images
    function downloadAllImages()
    {
        for (var i = 0; i < tempListPrinters.length; i++)
        {
            downloadImage(tempListPrinters[i])
        }
    }

    //saves new data (url = value, fileName = key)
    function saveImage(key, value)
    {
        FileSystem.downloadAsync(value, FileSystem.documentDirectory + key)
            .then(({ uri }) => 
            {
                //console.log('Finished downloading to ', uri);
            })
            .catch(error => 
            {
                console.error(error);
            });
    }

    //checks if data has already been saved
    async function checkForSavedData()
    {
        var returnValue = []
        if (!isWeb)
        {
            for (var i = 0; i < tempListPrinters.length; i++)
            {
                let path = FileSystem.documentDirectory + tempListPrinters[i].id + '.jpg'
                let data = await FileSystem.getInfoAsync(path)
                if (data.exists)
                {
                    returnValue = returnValue.concat(path)
                }
            }
        }
        return returnValue
    }

    //retrieves all saved
    function retrieveFromStorage()
    {
        for (var i = 0; i < tempListPrinters.length; i++)
        {
            let path = FileSystem.documentDirectory + tempListPrinters[i].id + '.jpg'

            addToDict(tempListPrinters[i].id, path, false)
        }
    }

    //Clears out all persistent data being stored for new data
    async function clearStorage()
    {
        //Refactor this with the clear function in SaveDataManager.js
        let persistentCleared = await checkForSavedData()
        if (persistentCleared.length !== 0)
        {
            for (var i = 0; i<Object.keys(images).length; i++)
            {
                FileSystem.deleteAsync(images[Object.keys(images)[i]])
            }
        }
    }
}

export { fetchPrinters };