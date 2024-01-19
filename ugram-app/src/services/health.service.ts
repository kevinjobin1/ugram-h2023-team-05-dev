import client from '../modules/axios-client';

export async function getHealth() {
  return await client.get('/health');
}
