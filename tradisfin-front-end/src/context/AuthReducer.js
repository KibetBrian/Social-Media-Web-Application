const AuthReducer = (state, action) =>
{
    switch(action.type)
    {
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true, 
                error: null,
            }
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return{
                user: null,
                isFetching: false,
                error: action.payload
            }
        case "LOG_OUT": 
            return {
                user:null
            }
        case "REGISTRATION_START":{
            return{
                user: null,
                isFetching: true,
                error: null
            }
        }
        case "REGISTRATION_SUCCESS":{
            return{
                user: null,
                isFetching: false,
                error: null
            }
            }
            case "FOLLOW":
                return{
                    ...state,
                    user:
                    {
                        ...state.user,
                        following: [...state.user.following, action.payload]
                    },
                    error: action.type
                }
                case "UNFOLLOW":
                    return{
                        ...state,
                        user:
                        {
                            ...state.user,
                            following: [...state.user.following.filter(following=>following !== action.payload)]
                        },
                        error: action.type
                    } 
            default:
                return state
    }
}
export default AuthReducer