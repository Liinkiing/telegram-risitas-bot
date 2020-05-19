import { RisibankSearchRoot } from "Risibot";

const BASE_URL = "https://api.risibank.fr/api/v0";

export default new class RisibankClient {
  public search = async (query: string): Promise<RisibankSearchRoot> =>
    (await fetch(
      `${BASE_URL}/search?search=${encodeURI(query)}`,
      { method: "post" },
    )).json();
}();
