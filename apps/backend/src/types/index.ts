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
    year: z.number().optional(),
    referralCode: z.string().optional(),
    referredById : z.string().optional(),
    role:z.enum(["STUDENT","ADMIN"]).default("STUDENT")
})
    

export const SigninSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should be at least 6 characters")
})


export const CreatecoursesSchema = z.object({
    image: z.string(),
    courseId: z.string().min(1, "Course ID is required"),
    title: z.string(),
    description: z.string(),
    price: z.number().positive("Price must be greater than 0"), 
    actualPrice: z.number().positive("Price must be greater than 0"), 
    index: z.number().optional().nullable(),
    categoryId: z.string(),
    categoryName: z.string().optional().default(""),
    categoryImg: z.string().optional().default(""),
    categoryIndex: z.number().optional().default(0).nullable(),
    mentorId: z.string(),
    mentorName: z.string().optional().default(""),
    mentorImage: z.string().optional().default(""), 
    mentorIndex: z.number().optional().default(0).nullable(),
});
  

export const updateCourseSchema = z.object({
    image:z.string().optional(),
    title:z.string().optional(),
    description:z.string().optional(),
    price: z.number().optional(),
    actualPrice: z.number().optional(),
    index: z.number().optional(),
    categoryId: z.string().optional(),
    categoryName:z.string().optional(),
    categoryImg: z.string().optional(),
    categoryIndex:z.number().optional(),
    mentorId: z.string().optional(),
    mentorName: z.string().optional(),
    mentorImage: z.string().optional(),
    mentorIndex: z.number().optional(),
    
})

export const createMentorSchema=z.object({
    mentorId: z.string(),
    name:z.string(),
    image:z.string(),
    categoryId: z.string(),
    categoryName:z.string().optional(),
    categoryImg: z.string().optional(),
    categoryIndex:z.number().optional(),
    index:z.number().optional()
})

export const updateMentorSchema=z.object({
    name:z.string().optional(),
    image:z.string().optional(),
    categoryId: z.string().optional(),
    categoryName:z.string().optional(),
    categoryImg: z.string().optional(),
    index:z.number().optional()
})

export const createCategorySchema=z.object({
    categoryId: z.string(),
    name:z.string(),
    index:z.number().optional(),
    image:z.string(),
})

export const updateCategorySchema=z.object({
    name:z.string().optional(),
    image:z.string().optional(),
    index:z.number().optional(),
})

export const updateCourseIndexSchema = z.object({
    newIndex:z.number()
})

export const updateCategoryIndexSchema = z.object({
    newIndex:z.number()
})


