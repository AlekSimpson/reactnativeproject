export default function printerImageDictReducer(dict = {}, action)
{
    switch(action.type)
    {
        case 'UPDATE_IMAGE_DICT':
            return action.payload
        default:
            return dict
    }
}