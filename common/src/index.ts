// This is common module
//  declaration": true, set true in tsconfig so that we can deploy this as npm package and use as a common module for frontend and backend
// we haven't learned monorepose yet so this is the way

import z from 'zod'

export const signUpInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signInInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export const deleteBlogInput = z.object({
    id: z.number(),
    authorId: z.number()
})

export type SignupInput = z.infer<typeof signUpInput>
export type SigninInput = z.infer<typeof signInInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type DeleteBlogInput = z.infer<typeof deleteBlogInput>