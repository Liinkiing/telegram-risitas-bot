import {RisibankSticker} from "../@types/risibank-client";
import {InlineQueryResultGif, InlineQueryResultCachedGif, InlineQueryResultPhoto, InlineQueryResultCachedPhoto} from "telegraf/typings/telegram-types";

type InlineGifResult = InlineQueryResultCachedGif | InlineQueryResultGif
type InlinePhotoResult = InlineQueryResultPhoto | InlineQueryResultCachedPhoto
type InlineStickerResults = (InlineGifResult | InlinePhotoResult)[]

export const convertRisibankStickerToGif = (sticker: RisibankSticker): InlineGifResult => {
  return {
    type: 'gif',
    id: sticker.risibank_link,
    gif_url: sticker.risibank_link,
    thumb_url: sticker.risibank_link,
  }
}

export const convertRisibankStickerToPhoto = (sticker: RisibankSticker): InlinePhotoResult => {
  return {
    type: 'photo',
    id: sticker.risibank_link,
    photo_url: sticker.risibank_link,
    thumb_url: sticker.risibank_link,
  }
}

export const convertRisibankStickersToInlineResults = (stickers: RisibankSticker[]): InlineStickerResults => {
  if (!stickers) {
    return []
  }
  return [
    ...stickers.filter(sticker => ['jpg', 'png', 'jpeg'].includes(sticker.ext)).map(convertRisibankStickerToPhoto),
    ...stickers.filter(sticker => ['gif'].includes(sticker.ext)).map(convertRisibankStickerToGif),
  ]
}

