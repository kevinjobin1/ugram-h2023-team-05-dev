import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export async function postPicture(formData: FormData) {
  await axios.post(apiUrl + '/posts', formData, {
    withCredentials: true,
  });
}

export async function updateProfilePicture(userId: string, formData: FormData) {
  await axios.patch(apiUrl + '/profiles/' + userId, formData, {
    withCredentials: true,
  });
}
