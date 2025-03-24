import {prismaClient} from "@repo/db/src";
import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from "dotenv";
import { paymentQueue } from '../queue';
import { Resend } from "resend";

dotenv.config();
const resend = new Resend("re_TdcBvneT_5DbUwu19BWBNR3MJ6CEUxB7o"); // Resend API key
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = "https://api.coursehubb.store/api/v1/payment/status";
const successUrl = "https://coursehubb.store/payment-success";
const failureUrl =  "https://coursehubb.store/payment-failure";
const BASE_URL = "https://api.phonepe.com/apis";
const client =  prismaClient
let walletbalance:number;
async function getAccessToken(): Promise<string> {
  const data = new URLSearchParams({
    client_id: clientId!,
    client_version: '1',
    client_secret: clientSecret!,
    grant_type: 'client_credentials',
  });
  try {
    const response = await axios.post(
      `${BASE_URL}/identity-manager/v1/oauth/token`,
      data.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error('Error obtaining access token:', error.response?.data || error.message);
    throw new Error('Failed to obtain access token');
  }
}

async function initiatePayment(amount: number): Promise<{ paymentUrl: string; merchantOrderId: string }> {
  const accessToken = await getAccessToken();
  const amountInPaise = amount * 100;
  const merchantOrderId = `MUID${Date.now()}`; 

  const data = {
    merchantOrderId,
    amount: amountInPaise,
    expireAfter: 1200,
    paymentFlow: {
      type: 'PG_CHECKOUT',
      merchantUrls: {
        redirectUrl: `${redirectUrl}?merchantOrderId=${merchantOrderId}`,
      },
    },
  };

  try {
    const response = await axios.post(`${BASE_URL}/pg/checkout/v2/pay`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      },
    });

    return { paymentUrl: response.data.redirectUrl,merchantOrderId  };
  } catch (error: any) {
    console.error('Error initiating payment:', error.response?.data || error.message);
    throw new Error('Payment initiation failed');
  }
}

export const paymentinitationController = async (req: Request, res: Response) => {
  try {
    const{amount,userId,courseIds,walletBalance}=req.body
    walletbalance=walletBalance

    if (!Array.isArray(courseIds) || courseIds.length === 0) {
     res.status(400).json({ message: "At least one course must be selected." });
     return
    }
    const { paymentUrl, merchantOrderId } = await initiatePayment(amount)
    console.log(paymentUrl,merchantOrderId)
    await client.purchase.create({
       data:{
        userId,
        amount:amount*100,
        merchantOrderId,
        status:"PENDING",
        courses:{   //Creates multiple entries in PurchaseCourse, each linking the purchase to a course
          create:courseIds.map((courseId: string) =>({
            course:{
              connect:{
                id:courseId  //Each course is connected to the purchase 
              }
            }
          }))
        }
       }
    })
    
    res.status(200).json({ paymentUrl });
    return
  } catch (error) {
    console.error('Payment process error:', error);
    res.status(500).json({ error: 'Payment process failed' });
  }
  return
};

export const paymentStatusController = async (req: Request, res: Response) => {
  const merchantOrderId = req.query.merchantOrderId as string | undefined;
 
  try {  
    if (!merchantOrderId || typeof merchantOrderId !== 'string') {
        res.status(400).json({ error: 'Invalid or missing order ID' });
        return
    }
    const accessToken = await getAccessToken();
    const response = await axios.get(`${BASE_URL}/pg/checkout/v2/order/${merchantOrderId}/status`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      }
    });
   

    if (response.data.state === 'COMPLETED') {
      const purchaseData = await client.purchase.update({
        where: { merchantOrderId },
        data:{
          status:"COMPLETED"
        }
      })
      if(walletbalance){
        await client.user.update({
          where:{
            id:purchaseData.userId
          },data:{
            walletBalance:0
          }
        })
      }
      return res.redirect(successUrl);
    } else {
      await client.purchase.update({
        where: { merchantOrderId },
        data:{
          status:"FAILED"
        }
      })
      return res.redirect(failureUrl);
    }
  } catch (error: any) {
    console.error('Payment status check error:', error.response?.data || error.message);
    await client.purchase.update({
      where: { merchantOrderId },
      data:{
        status:"FAILED"
      }
    })
    return res.redirect(failureUrl);
  }
};


export const webhookHandler = async(req:Request,res:Response)=>{
  const { state, merchantOrderId, amount } = req.body.payload;
   
  const purchaseDetails = await client.purchase.findUnique({
    where:{
      merchantOrderId
    },include:{
      user:true
    }
  })
  try{
  if(amount!==purchaseDetails?.amount){
    await resend.emails.send({
      from: "ultimatcourses@coursehubb.store",
      replyTo: "coursehubb.store@gmail.com",
      to: `${purchaseDetails?.user?.email}`, 
      subject: "⚠️ Payment Amount Not Valid",
      text: `Dear User,
      We have received your  of ${amount}, but the amount provided is not valid for the selected course. Please ensure that the correct amount is submitted.
      Rest assured, your payment will be refunded within 24 hours.
      If you have any questions, feel free to contact our support team at coursehubb.store@gmail.com.
      Best regards,  
      Course Hub Support Team`
      });
      await resend.emails.send({
        from: "ultimatcourses@coursehubb.store",
        replyTo: "coursehubb.store@gmail.com",
        to: "coursehubb.store@gmail.com", 
        subject: "🔄 Refund Required for Invalid Payment",
        text: `Dear Admin,      
      A user has made an invalid payment for a course, and a refund needs to be processed.     
      User Details:
      - Email: ${purchaseDetails?.user?.email}  
      - Paid Amount: ${amount}  
      - Expected Amount: ${purchaseDetails?.amount}  
      Please process the refund within 24 hours and notify the user once completed.
      If you need any further details, please reach out.
      Best regards,  
      Course Hub Support Team`
      });
    return;
  }
 
   if(state=="COMPLETED"){
      await paymentQueue.add("processPayment", merchantOrderId)
        res.status(200).json({
          message:"merchant added successfull"
        })
    }
    if(state =="FAILED"){
      await client.purchase.update({
        where: { merchantOrderId },
        data:{
          status:"FAILED"
        }
      })
    }
  }catch(e){
    res.status(500).json({
      message:"Internal server error"
    })
    return
  }
}

