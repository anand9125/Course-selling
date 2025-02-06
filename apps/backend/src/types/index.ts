import z from "zod"

export const SignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    isInCollage:z.boolean().default(false),
    college: z.string().optional().refine(val => val ? val.length > 0 : true, {  //refine is for cutom validation loigic its allow to define a validation logic function wheater data meets specific criteria
        message: "College name is required if you are in college"
      }),
    branch: z.string().optional().refine(val => val ? val.length > 0 : true, {
       message: "Branch is required if you are in college"
    }), 
    year: z.number().int().min(1).max(5).optional(),
    referralCode: z.string().optional(),
    role:z.enum(["STUDENT","ADMIN"]).default("STUDENT"),
    categoryNames: z.array(z.string()).min(1, "Select at least one category")
})
    

export const SigninSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should be at least 6 characters")
})