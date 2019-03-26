import fetch from 'node-fetch'
import {RisibankSearchRoot} from "../@types/risibank-client";

const BASE_URL = 'https://api.risibank.fr/api/v0'

export default new class RisibankClient {

  public search = async (query: string): Promise<RisibankSearchRoot> => {
    const url = `${BASE_URL}/search?search=${encodeURI(query)}`
    console.log(url)
    const result = await fetch(`${url}`, { method: 'post' })
    return result.json()
  }

}


