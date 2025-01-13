import z from "zod"

export const SignupSchema = z.object({
    fullName :z.string().optional(),
    username :z.string().email(),
    password :z.string().min(8).max(20),
    profilePicture :z.string().optional()
})
export const SigninScheme = z.object({
    username : z.string().email(),
    password : z.string().min(8).max(20)
})

