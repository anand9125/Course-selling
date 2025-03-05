import axios from "axios";
import { Request,Response } from "express"
import * as crypto from 'crypto'; 

const PHONEPE_BASE_URL = 'https://api-preprod.phonepe.com/apis/hermes';
const MERCHANT_ID = 'YOUR_MERCHANT_ID';  // Get from PhonePe UAT Dashboard
const SALT_KEY = 'YOUR_SALT_KEY';        // Get from PhonePe UAT Dashboard
const SALT_INDEX = 'YOUR_SALT_INDEX';    // Usually '1' in test mode
const CALLBACK_URL = `http://localhost:3001/api/v1 status`;

export const paymentController = async (req:Request,res:Response) => {
    const { amount, userId, courseId } = req.body;

    const payload = {
        merchantId: MERCHANT_ID,
        merchantTransactionId: `TXN_${Date.now()}`,
        merchantUserId: userId,
        amount: amount * 100, // Convert to paisa (INR)
        redirectUrl: CALLBACK_URL,   //This is the URL to which the user is redirected after completing the payment.
        callbackUrl: CALLBACK_URL,  //This is the URL that the payment gateway calls to notify your backend server about the transaction status.
        mobileNumber: '9999999999', // Use test number
        paymentInstrument: {
            type: 'UPI_INTENT'
        }
    };

    // Convert payload to Base64
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');

    // Generate checksum
    const checksum = crypto
        .createHash('sha256')
        .update(payloadBase64 + SALT_KEY)
        .digest('hex') + `###${SALT_INDEX}`;

    try {
        // Make API Request to PhonePe Test Mode
        const response = await axios.post(
            `${PHONEPE_BASE_URL}/pg/v1/pay`,
            { request: payloadBase64 },
            { headers: { 'Content-Type': 'application/json', 'X-VERIFY': checksum } }
        );

         res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    return
    }
}


export const paymentCallBackController = async (req: Request, res: Response) => {
    const { transactionId, code, message } = req.body;

    if (code === 'PAYMENT_SUCCESS') {
        console.log(`Payment Success for TXN: ${transactionId}`);
        // Grant course access to user in database
    } else {
        console.log(`Payment Failed: ${message}`);
    }

    res.status(200).send('OK');
}

export const paymentStatusController = async (req: Request, res: Response) => {
    const { transactionId } = req.params;

    const checksum = crypto
        .createHash('sha256')
        .update(`/pg/v1/status/${MERCHANT_ID}/${transactionId}` + SALT_KEY)
        .digest('hex') + `###${SALT_INDEX}`;

    try {
        const response = await axios.get(
            `${PHONEPE_BASE_URL}/pg/v1/status/${MERCHANT_ID}/${transactionId}`,
            { headers: { 'X-VERIFY': checksum, 'X-MERCHANT-ID': MERCHANT_ID } }
        );

         res.json(response.data);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}