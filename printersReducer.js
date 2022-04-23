export default function printersReducer(state = [], action)
{
    switch(action.type)
    {
        case 'UPDATE':
            return action.payload
        default:
            return state
    }
}