import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const contentType = 'application/json';

const client = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-type': contentType,
    Accept: contentType,
  },
});

export const mapFormError = (field: string, error: AxiosError | undefined) => {
  const propertyError = getFieldError(field, error);

  return propertyError ?? '';
};

export const isFieldInError = (field: string, error: AxiosError | undefined) => {
  const propertyError = getFieldError(field, error);

  return propertyError != undefined;
};

const getFieldError = (field: string, error: AxiosError | undefined) => {
  if (!error) return;

  const data = error.response?.data as any;
  if (data.statusCode != 400) return;

  const messages = data?.message as Array<string>;
  return messages.find((m) => m.startsWith(field));
};

export default client;
