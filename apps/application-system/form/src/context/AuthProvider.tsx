import React, { createContext, useContext, useReducer } from 'react'
import { User } from 'oidc-client'

export type AsyncActionState = 'passive' | 'pending' | 'fulfilled' | 'failed'

export interface AuthReducerState {
  userInfo?: User
  userInfoState: AsyncActionState
  isAuthenticated: boolean
}

export enum ActionType {
  SET_USER_PENDING = 'SET_USER_PENDING',
  SET_USER_FULFILLED = 'SET_USER_FULFILLED',
  SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT',
}

interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

const USER_MOCKED = process.env.API_MOCKS === 'true'

const initialState: AuthReducerState = USER_MOCKED
  ? {
      userInfo: ({
        profile: { name: 'Mock', locale: 'is', nationalId: '0000000000' },
      } as unknown) as User,
      userInfoState: 'fulfilled',
      isAuthenticated: true,
    }
  : {
      userInfo: undefined,
      userInfoState: 'passive',
      isAuthenticated: false,
    }
export const AuthContext = createContext<
  [AuthReducerState, (action: Action) => void]
>([
  initialState,
  () => {
    return undefined
  },
])

const reducer = (state: AuthReducerState, action: Action): AuthReducerState => {
  switch (action.type) {
    case ActionType.SET_USER_PENDING:
      return {
        ...state,
        userInfoState: 'pending',
        isAuthenticated: false,
      }
    case ActionType.SET_USER_FULFILLED:
      return {
        ...state,
        userInfo: action.payload,
        userInfoState: 'fulfilled',
        isAuthenticated: true,
      }
    case ActionType.SET_USER_LOGGED_OUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthState: () => [
  AuthReducerState,
  (action: Action) => void,
] = () => useContext(AuthContext)
