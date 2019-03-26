import {RisibankSticker} from "../@types/risibank-client";
import {InlineQueryResultGif, InlineQueryResultCachedGif, InlineQueryResultPhoto, InlineQueryResultCachedPhoto} from "telegraf/typings/telegram-types";

type InlineGifResult = InlineQueryResultCachedGif | InlineQueryResultGif
type InlinePhotoResult = InlineQueryResultPhoto | InlineQueryResultCachedPhoto
type InlineStickerResults = (InlineGifResult | InlinePhotoResult)[]

export const convertRisibankStickerToGif = (sticker: RisibankSticker): InlineGifResult => {
  return {
    type: 'gif',
    id: String(sticker.id),
    gif_url: sticker.risibank_link,
    thumb_url: sticker.risibank_link,
  }
}

export const convertRisibankStickerToPhoto = (sticker: RisibankSticker): InlinePhotoResult => {
  return {
    type: 'photo',
    id: String(sticker.id),
    photo_url: sticker.risibank_link,
    thumb_url: sticker.risibank_link,
  }
}


export const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const convertRisibankStickersToInlineResults = (stickers: RisibankSticker[]): InlineStickerResults => {
  if (!stickers) {
    return []
  }
  return shuffle(
    [
      ...stickers.filter(sticker => ['jpg', 'png', 'jpeg'].includes(sticker.ext)).map(convertRisibankStickerToPhoto),
      ...stickers.filter(sticker => ['gif'].includes(sticker.ext)).map(convertRisibankStickerToGif),
    ]
  )
}

