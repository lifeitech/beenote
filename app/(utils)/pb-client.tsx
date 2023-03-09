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
  // const userId = JSON.parse(decodeURIComponent(document.cookie).substring(8)).model.id;
  return client;
}
