import api from '@/modules/api'
import { IUser } from '@/types/users';

export const postLogin = async (data: FormData) => {
  const response = await api.asyncPost('/api/v1/auth/login', data);

  if (response.data['access_token']) return response.data['access_token'];
}

export const getUserData = async () => {
  const response = await api.asyncGet<IUser>('/api/v1/users/me');

  localStorage.setItem('USER_TYPE', 'client');
  localStorage.setItem('USER_ID', response.data.id.toString());
  localStorage.setItem('USER_DATA', JSON.stringify(response.data));

  return response.data;
}

// Check Code
export const postCheckCode = (url: string, code: string, token: string) =>
  api.asyncPost<string>(url, {
    "token": token,
    "code": code,
  });

// Register
export const postRegisterGetCode = async (phone: string) => {
  const response = await api.asyncPost<string>('/api/v1/auth/register', {});
  if (response.data['token']) return response.data['token'];
}

export const postRegisterFinish = (data: any) =>
  api.asyncPost<string>('/api/v1/auth/register/extra', data);

// Reset Password
export const postResetPasswordGetCode = async (phone: string) => {
  const response = await api.asyncPost<string>('/api/v1/auth/password/send-sms', {
    "phone": phone,
  });
  if (response.data['token']) return response.data['token'];
}

export const postResetPasswordFinish = (password: string, token: string) =>
  api.asyncPost<string>('/api/v1/auth/password/reset', {
    "token": token,
    "password": password,
  });