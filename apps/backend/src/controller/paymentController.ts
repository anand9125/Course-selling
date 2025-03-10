// import axios from "axios";
// import crypto from "crypto";
// import { Request, Response } from "express";
// import dotenv from "dotenv";
// import { v4 as uuidv4 } from "uuid";

// dotenv.config();

// const MERCHANT_KEY = process.env.MERCHANT_KEY;
// const MERCHANT_ID = process.env.MERCHANT_ID;

// if (!MERCHANT_KEY || !MERCHANT_ID) {
//   console.error("Missing required environment variables: MERCHANT_KEY or MERCHANT_ID");
//   process.exit(1);
// }

// // Production URLs with correct endpoint structure
// const BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1";
// const redirectUrl = "https://api.coursehubb.store/api/v1/payment/status";
// const successUrl = "https://coursehubb.store/payment-success";
// const failureUrl = "https://coursehubb.store/payment-failure";

// export const paymentController = async (req: Request, res: Response) => {
//   try {
//     const { name, mobileNumber, amount } = req.body;
//     if (!name || !mobileNumber || !amount) {
//       res.status(400).json({ error: "Missing required fields: name, mobileNumber, amount" });
//       return;
//     }

//     const orderId = uuidv4();
//     const paymentPayload = {
//       merchantId: MERCHANT_ID,
//       merchantUserId: "MUID" + Date.now(),
//       merchantTransactionId: orderId,
//       amount: amount * 100,
//       redirectUrl: `${redirectUrl}/?id=${orderId}`,
//       redirectMode: "POST",
//       callbackUrl: `${redirectUrl}/?id=${orderId}`,
//       mobileNumber: mobileNumber,
//       paymentInstrument: {
//         type: "PAY_PAGE"
//       }
//     };

//     const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
//     const keyIndex = 1;
//     // The correct order is: base64Payload + "/pg/v1/pay" + MERCHANT_KEY
//     const string = `${base64Payload}/pg/v1/pay${MERCHANT_KEY}`;
//     const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//     const checksum = `${sha256}###${keyIndex}`;

//     const options = {
//       method: "POST",
//       url: `${BASE_URL}/pay`,
//       headers: {
//              accept:'application/json',
//              'Content-Type': 'application/json',
//              'X-VERIFY': checksum
//       },
//       data: {
//         request: base64Payload
//       }
//     };

//     console.log('Payment Request:', {
//       url: options.url,
//       merchantTransactionId: orderId,
//       amount: amount,
//       checksum: checksum,
//       base64Payload: base64Payload
//     });

//     const response = await axios(options);

//     if (response.data.success) {
//       res.status(200).json({
//         success: true,
//         url: response.data.data.instrumentResponse.redirectInfo.url
//       });
//     } else {
//       throw new Error(response.data.message || 'Payment initiation failed');
//     }

//   } catch (error: any) {
//     console.error("Payment Error:", {
//       message: error.message,
//       response: error.response?.data,
//       status: error.response?.status,
//       headers: error.response?.headers
//     });

//     res.status(error.response?.status || 500).json({
//       success: false,
//       error: "Payment initiation failed",
//       message: error.response?.data?.message || error.message
//     });
//   }
// };

// export const paymentStatusController = async (req: Request, res: Response) => {
//   try {
//     const merchantTransactionId = req.query.id as string;

//     if (!merchantTransactionId) {
//       console.error('Missing transaction ID in status check');
//       res.redirect(failureUrl);
//       return;
//     }

//     const keyIndex = 1;
//     // The correct order is: "/pg/v1/status/" + MERCHANT_ID + "/" + merchantTransactionId + MERCHANT_KEY
//     const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}${MERCHANT_KEY}`;
//     const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//     const checksum = `${sha256}###${keyIndex}`;

//     const options = {
//       method: 'GET',
//       url: `${BASE_URL}/status/${MERCHANT_ID}/${merchantTransactionId}`,
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'X-VERIFY': checksum,
//         'X-MERCHANT-ID': MERCHANT_ID
//       }
//     };

//     console.log('Status Check Request:', {
//       url: options.url,
//       merchantTransactionId,
//       checksum: checksum
//     });

//     const response = await axios(options);

//     if (response.data.success === true) {
//       const paymentStatus = response.data.data?.responseCode;
      
//       console.log('Payment Status:', {
//         merchantTransactionId,
//         status: paymentStatus,
//         response: response.data
//       });

//       if (paymentStatus === 'SUCCESS' || paymentStatus === 'PAYMENT_SUCCESS') {
//         res.redirect(successUrl);
//       } else {
//         res.redirect(failureUrl);
//       }
//     } else {
//       console.error('Payment status check failed:', response.data);
//       res.redirect(failureUrl);
//     }
//   } catch (error: any) {
//     console.error('Payment status check error:', {
//       error: error.message,
//       response: error.response?.data,
//       headers: error.response?.headers
//     });
//     res.redirect(failureUrl);
//   }
// };