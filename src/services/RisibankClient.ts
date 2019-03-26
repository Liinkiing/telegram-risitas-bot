import fetch from 'node-fetch'
import {RisibankSearchRoot} from "../@types/risibank-client";

const BASE_URL = 'https://api.risibank.fr/api/v0'

export default new class RisibankClient {

  public search = async (query: string): Promise<RisibankSearchRoot> =>
    (await fetch(`${BASE_URL}/search?search=${encodeURI(query)}`, {method: 'post'})).json()

}


