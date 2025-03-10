import axios from 'axios';
import { Request, Response } from 'express';
 import dotenv from "dotenv";
 dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackUrl = "https://api.coursehubb.store/api/v1/payment/status"
const redirectUrl = "https://coursehubb:store/payment-success";
const successUrl = "https://coursehubb.store/payment-success";
const failureUrl = "https://coursehubb.store/payment-failure";
const BASE_URL = "https://api.phonepe.com/apis";
dotenv.config();
// Function to obtain access token
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

// Function to initiate payment
async function initiatePayment(amount: number): Promise<string> {
  const accessToken = await getAccessToken(); // Always fetch fresh token
  const merchantOrderId = `MUID${Date.now()}`;
  const amountInPaise = amount * 100;

  const data = {
    merchantOrderId,
    amount: amountInPaise,
    expireAfter: 1200,
    paymentFlow: {
      type: 'PG_CHECKOUT',
      merchantUrls: {
        callbackUrl: `${callbackUrl}/?id=${merchantOrderId}`,
        redirectUrl: `${redirectUrl}/?id=${merchantOrderId}`,
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
    return response.data.redirectUrl;
  } catch (error: any) {
    console.error('Error initiating payment:', error.response?.data || error.message);
    throw new Error('Payment initiation failed');
  }
}

// Controller function to handle payment requests
export const paymentController = async (req: Request, res: Response) => {
  try {
    const { name, mobileNumber, amount } = req.body;
    if (!name || !mobileNumber || !amount) {
     res.status(400).json({ error: 'Missing required fields' });
     return
    }

    const paymentUrl = await initiatePayment(amount);
    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error('Payment process failed:', error);
    res.status(500).json({ error: 'Payment process failed' });
  }
};

// Controller to check payment status
export const paymentStatusController = async (req: Request, res: Response) => {
  try {
    const merchantOrderId = req.query.id as string;
    if (!merchantOrderId) {
     res.status(400).json({ error: 'Missing order ID' });
     return
    }

    const accessToken = await getAccessToken(); // Fetch a fresh token

    const response = await axios.get(`${BASE_URL}/pg/checkout/v2/order/${merchantOrderId}/status`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      },
      params: { details: false, errorContext: true },
    });

    if (response.data.state === 'COMPLETED') {
      res.redirect(successUrl);
    } else {
      res.redirect(failureUrl);
    }
  } catch (error: any) {
    console.error('Payment status check error:', error.response?.data || error.message);
    res.redirect(failureUrl);
  }
};
