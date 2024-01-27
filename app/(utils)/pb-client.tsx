// get PocketBase client from the client (browser) environments
import PocketBase from "pocketbase";

export default function getclient() {
  const client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE);
  if (typeof document !== "undefined") {
    client.authStore.loadFromCookie(document.cookie);
    client.authStore.onChange(() => {
      document.cookie = client.authStore.exportToCookie({ httpOnly: false });
    });
  }
  return client;
}
