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
    referredById : z.string().optional(),
    role:z.enum(["STUDENT","ADMIN"]).default("STUDENT")
})
    

export const SigninSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should be at least 6 characters")
})


export const CreatecoursesSchema = z.object({
    image:z.string(),
    courseId: z.string().min(1, "Course ID is required"),
    title:z.string(),
    description:z.string(),
    price: z.number().positive("Price must be greater than 0"), 
    actualPrice: z.number().positive("Price must be greater than 0"), 
    index: z.number().optional(),
    categoryId: z.string(),
    categoryName:z.string().optional(),
    categoryImg: z.string().optional(),
    categoryIndex:z.number().optional(),
    mentorId: z.string(),
    mentorName: z.string().optional(),
    mentorImage: z.string().optional(), 
    mentorIndex: z.number().optional(),
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



export const phonePeWebhookSchema = z.object({
    event: z.string(), // Event type
    payload: z.object({
        orderId: z.string(), // Order ID
        merchantId: z.string(), // Merchant ID
        merchantOrderId: z.string(), // Merchant Order ID
        state: z.enum(["COMPLETED", "FAILED", "PENDING"]), // Payment state
        amount: z.number(), // Amount in smallest currency unit (e.g., paisa)
        expireAt: z.number(), // Expiry timestamp
        metaInfo: z.object({
            udf1: z.string().optional(),
            udf2: z.string().optional(),
            udf3: z.string().optional(),
            udf4: z.string().optional()
        }),
        paymentDetails: z.array(
            z.object({
                paymentMode: z.string(), // Payment mode (e.g., UPI_QR)
                transactionId: z.string(), // Transaction ID
                timestamp: z.number(), // Transaction timestamp
                amount: z.number(), // Payment amount
                state: z.enum(["COMPLETED", "FAILED", "PENDING"]), // Payment status
                splitInstruments: z.array(
                    z.object({
                        amount: z.number(),
                        rail: z.object({
                            type: z.enum(["UPI", "CARD", "NETBANKING"]), // Payment type
                            upiTransactionId: z.string().optional(),
                            vpa: z.string().optional()
                        }),
                        instrument: z.object({
                            type: z.string(), // Account type
                            accountType: z.string(), // Savings/Current/etc.
                            accountNumber: z.string() // Account number
                        })
                    })
                )
            })
        )
    })
});

export const purchasesSchema = z.object({
    userId:z.string(),
    courseId:z.string(),
    amount:z.number(),
})

