import axios from "axios";
import crypto from "crypto";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
require('dotenv').config();
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');


const MERCHANT_KEY =  process.env.MERCHANT_KEY;
const MERCHANT_ID =  process.env.MERCHANT_ID;

const MERCHANT_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
const MERCHANT_STATUS_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status"

const redirectUrl = "https://api.coursehubb.store/api/v1/payment/status"

const successUrl="https://coursehubb.store/payment-success"
const failureUrl="https://coursehubb.store/payment-failure"

export const paymentController = async (req: Request, res: Response) => {
  const { name, mobileNumber, amount } = req.body;
  const orderId = uuidv4();

  const paymentPayload = {
    merchantId: MERCHANT_ID,
    merchantUserId: name,
    mobileNumber: mobileNumber,
    amount: amount * 100,
    merchantTransactionId: orderId,
    redirectUrl: `${redirectUrl}/?id=${orderId}`,
    redirectMode: "POST",
    paymentInstrument: { type: "PAY_PAGE" },
  };

  const payload = Buffer.from(JSON.stringify(paymentPayload)).toString("base64");
  const keyIndex = 1; 
  const string = payload + "/pg/v1/pay" + MERCHANT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  console.log("Checksum:", checksum);

  const option = {
    method: "POST",
    url: MERCHANT_BASE_URL,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": MERCHANT_ID,
    },
    data: JSON.stringify({ request: payload }),
  };

  try {
    const response = await axios.request(option);
    console.log("Response:", response.data);

    res.status(200).json({ msg: "OK", url: response.data.data.instrumentResponse.redirectInfo.url});
  } catch (error: any) {
    console.error("Error in payment:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate payment", details: error.response?.data || error.message });
  }
};

 export const paymentStatusController = async (req: Request, res: Response) => {
  const merchantTransactionId = req.query.id;

  const keyIndex = 1
  const string  = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY
  const sha256 = crypto.createHash('sha256').update(string).digest('hex')
  const checksum = sha256 + '###' + keyIndex

  const option = {
      method: 'GET',
      url:`${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
      headers: {
          accept : 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': MERCHANT_ID
      },
  }

  axios.request(option).then((response) => {
      if (response.data.success === true){
          return res.redirect(successUrl)
      }else{
          return res.redirect(failureUrl)
      }
  })
  };