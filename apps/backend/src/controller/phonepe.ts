import {prismaClient} from "@repo/db/src";
import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from "dotenv";
import { phonePeWebhookSchema, purchasesSchema } from '../types';
import { paymentQueue } from '../queue';



dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = "http://localhost:3003/api/v1/payment/status";
const successUrl = "http://localhost:5173/payment-success";
const failureUrl = "http://localhost:5173/payment-failure";
const BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const client =  prismaClient

async function getAccessToken(): Promise<string> {
  const currentTime = Date.now();
  const data = new URLSearchParams({
    client_id: clientId!,
    client_version: '1',
    client_secret: clientSecret!,
    grant_type: 'client_credentials',
  });
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/oauth/token`,
      data.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log(response.data.access_token)
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
    const response = await axios.post(`${BASE_URL}/checkout/v2/pay`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      },
    });
   console.log(response.data,merchantOrderId)
    return { paymentUrl: response.data.redirectUrl,merchantOrderId  };
  } catch (error: any) {
    console.error('Error initiating payment:', error.response?.data || error.message);
    throw new Error('Payment initiation failed');
  }
}

export const paymentController = async (req: Request, res: Response) => {
  try {
    const parseData = purchasesSchema.safeParse(req.body)
    if(!parseData.success){
      res.status(400).json({message:"Invalid data"})
      return
    }
    const { paymentUrl, merchantOrderId } = await initiatePayment(parseData.data?.amount);
    console.log(paymentUrl,merchantOrderId)
    await client.purchase.create({
       data:{
        userId:parseData.data.userId,
        courseId:parseData.data.courseId,
        amount:parseData.data.amount,
        merchantOrderId, 
        status:"PENDING"
       }
    })
    
    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error('Payment process error:', error);
    res.status(500).json({ error: 'Payment process failed' });
  }
};

export const paymentStatusController = async (req: Request, res: Response) => {
  const merchantOrderId = req.query.merchantOrderId as string | undefined;
  try {  
    if (!merchantOrderId || typeof merchantOrderId !== 'string') {
       res.status(400).json({ error: 'Invalid or missing order ID' });
       return
    }
    const accessToken = await getAccessToken();
    const response = await axios.get(`${BASE_URL}/checkout/v2/order/${merchantOrderId}/status`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      }
    });

    if (response.data.state === 'COMPLETED') {
      await client.purchase.update({
        where: { merchantOrderId },
        data:{
          status:"COMPLETED"
        }
      })
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


export const verifyPayment = async(req:Request,res:Response)=>{
  const parseData = phonePeWebhookSchema.safeParse(req.body)
  if(!parseData.success){
    res.status(400).json({
    message:"Invalid data"
    })
    return;
  }
  try{
    await paymentQueue.add("processPayment", parseData.data)
    res.status(200).json({
      message:"got the messages"
    })
  }
   catch(e){
    res.json({
      message:"error while hiting webhook"
    })
   }
  // Add job to queue job name procesPyament
   


    //  res.status(200).json({
    //   message:"got the messages"
    // })
   
}