import MongoDbConnection from "@/lib/database";
import { OAuth2Client } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from "next";
const client = new OAuth2Client('')

async function verify(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });
    const payload = ticket.getPayload();
    if (payload) {
        const userid = payload['sub']
    }
    return payload;
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { token } = req.body;

            const payload = await verify(token)
                .catch(console.error);

            // 2. Find or create the user in your database
            await MongoDbConnection.connect();
            const usersCollection = await MongoDbConnection.getCollection('users');
            let user: any;
            user = await usersCollection.findOne({ email: payload?.email });
            if (!user) {
                user = {
                    email: payload?.email,
                    name: payload?.name,
                    provider: 'google'
                };
                await usersCollection.insertOne(user);
                res.status(200).json({ status: true, message: user});
            }

            res.status(200).json({status: true, message: 'Login successful'});
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
            res.status(500).json({status: false, message: 'Login failed' });
        }
    } else {
        res.status(405).json({ status: false, message: 'Method not allowed' });
    }
}
