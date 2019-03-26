export interface RisibankSearchSticker {
  pseudo_custom: string,
  pseudo: string,
  risibank_link: string,
  id: number,
  user: number,
  link: string,
  cat: string,
  tags: string,
  views: number,
  likes: number,
  state: number,
  tms: number,
  ext: string,
}

export type RisibankSticker = RisibankSearchSticker

export interface RisibankSearchRoot {
  stickers: RisibankSticker[],
  favs: unknown[]
}
