import axios from 'axios'
import { AppDispatch } from '../../../store/index'
import { IUser } from '../../../models/IUser'
import {
  AuthActionEnum,
  SetUserAction,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
} from './types'
import { UserService } from '../../../api/UserService'

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),

  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),

  setError: (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error,
  }),

  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading,
  }),

  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true))
        setTimeout(async () => {
          const response = await UserService.getUsers()
          const mockUser = response.data.find(
            (user) => user.username === username && user.password === password,
          )
          if (mockUser) {
            localStorage.setItem('auth', 'true')
            localStorage.setItem('username', mockUser.username)

            dispatch(AuthActionCreators.setUser(mockUser))
            dispatch(AuthActionCreators.setIsAuth(true))
          } else {
            dispatch(
              AuthActionCreators.setError('Username or password is incorrect'),
            )
          }
          dispatch(AuthActionCreators.setIsLoading(false))
        }, 1000)
      } catch (e) {
        dispatch(AuthActionCreators.setError('Login Error'))
      }
    },

  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem('auth')
      localStorage.removeItem('username')
      dispatch(AuthActionCreators.setUser({} as IUser))
      dispatch(AuthActionCreators.setIsAuth(false))
    } catch (e) {
      dispatch(AuthActionCreators.setError('Logout Error'))
    }
  },
}
