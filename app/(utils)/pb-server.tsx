// get PocketBase client from the server (node) environments

import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';

export default function getclient() {

  const client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE);
  const cookie = cookies().get('pb_auth');
  const cookie_string = cookie?.name + '=' + cookie?.value;
  client.authStore.loadFromCookie(cookie_string);

  return client
}