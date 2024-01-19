import client from '../modules/axios-client';
import { Account, Profile, UserEdit, UserRegister } from '../types/User';

export async function editUser(userEdit: UserEdit) {
  return client.patch('/account', userEdit, {
    withCredentials: true,
  });
}

export async function registerUser(userRegister: UserRegister): Promise<Account> {
  return client
    .post('/account/signup', userRegister)
    .then((response) => {
      if (response.status === 201) {
        return response.data;
      }
    })
    .catch((err) => {
      return err;
    });
}

export async function fetchUserProfile(userId: string): Promise<Profile> {
  return client
    .get(`/profiles/${userId}`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((err) => {
      return err;
    });
}
