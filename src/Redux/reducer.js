import {
  CLEAR_DETAIL,
  FILTER_BY_COLOR,
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_DETAIL,
  ORDERBYPRICE,
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES,
  CLEAR_PRODUCTS,
  GET_BY_HASHTAG,
  FILTER_BY_TYPE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FILTER_RESTART,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_USER_SUCCESS, 
  UPDATE_USER_FAILURE,
  LOGOUT,
  FILTER_BY_MATERIAL,
  GET_DESING,
} from "./actionsTypes";

let initialState = {
  products: [],
  products_Copy: [],
  error: null,
  products_Details: {},
  user: null,
  loading: false,
  authenticated: false,
  categories: [],
  categories_Copy: [],
  desings: [],
  desings_Copy: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        products_Copy: action.payload,
      };

    case ORDERBYPRICE:
      return {
        ...state,
        products: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        products_Details: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        products_Details: {},
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        categories_Copy: action.payload,
      };
    case FILTER_BY_CATEGORIES:
      return {
        ...state,
        products: action.payload,
      };
    case FILTER_BY_COLOR:
      return {
        ...state,
        products: action.payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        products: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        products: action.payload,
      };
    case GET_BY_HASHTAG:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: state.products_Copy,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FILTER_RESTART:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case UPDATE_USER_SUCCESS: 
      return {
        ...state,
        user: action.payload, 
        loading: false,
        error: null,
      };
    
    case UPDATE_USER_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case LOGOUT:return {
        ...state,
        ...state,
    authenticated: false,
      };

    case FILTER_BY_MATERIAL:
      return {
        ...state,
        products: action.payload,
      };
    case GET_DESING: 
      return {
        ...state, 
        desings: action.payload, 
        desings_Copy: action.payload
      }

    default:
      return { ...state };
  }
};

export default Reducer;
