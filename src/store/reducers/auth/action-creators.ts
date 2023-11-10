import axios from 'axios';
import { AppDispatch } from '../..';
import { IUser } from '../../../models/IUser';
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from './types';
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
	setAuth: (payload: boolean): SetAuthAction => ({
		type: AuthActionEnum.SET_AUTH,
		payload,
	}),
	setUser: (payload: IUser): SetUserAction => ({
		type: AuthActionEnum.SET_USER,
		payload,
	}),
	setIsLoading: (payload: boolean): SetIsLoadingAction => ({
		type: AuthActionEnum.SET_IS_LOADING,
		payload,
	}),
	setError: (payload: string): SetErrorAction => ({
		type: AuthActionEnum.SET_ERROR,
		payload,
	}),
	login: (username: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true));
			setTimeout(async () => {
				const response = await UserService.getUsers();
				const user = response.data.find(user => user.username === username && user.password === password);
				console.log(user);

				if (user) {
					localStorage.setItem('auth', 'true');
					localStorage.setItem('username', username);
					dispatch(AuthActionCreators.setAuth(true));
					dispatch(AuthActionCreators.setUser(user));
				}
				else {
					dispatch(AuthActionCreators.setError('Unknown username or/and password'));
					console.log('error')
				}

				dispatch(AuthActionCreators.setIsLoading(false));
			}, 1000);
		}

		catch(e) {
			dispatch(AuthActionCreators.setError('Login Error'))
		}
	},
	logout: () => async(dispatch: AppDispatch) => {
		localStorage.removeItem('auth');
		localStorage.removeItem('username');
		dispatch(AuthActionCreators.setAuth(false));
		dispatch(AuthActionCreators.setUser({} as IUser));
	}
};