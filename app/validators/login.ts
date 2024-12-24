import vine from '@vinejs/vine'
export const LoginValidate = vine.compile(
    vine.object({
      uid: vine.string().trim().minLength(5).maxLength(5),
    })
  )