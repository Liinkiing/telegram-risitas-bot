import {RisibankSticker} from "../@types/risibank-client";
import {
  InlineQueryResultGif,
  InlineQueryResultCachedGif,
  InlineQueryResultPhoto,
  InlineQueryResultCachedPhoto
} from "typegram";

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

export const convertRisibankStickersToInlineResults = (stickers: RisibankSticker[]): InlineStickerResults => {
  if (!stickers) {
    return []
  }
  return [
    ...stickers.map(sticker => ['gif'].includes(sticker.ext) ?
      convertRisibankStickerToGif(sticker) :
      convertRisibankStickerToPhoto(sticker)
    )
  ]
}

