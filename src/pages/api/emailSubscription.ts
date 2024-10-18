import type { NextApiRequest, NextApiResponse } from "next";
import MongoDbConnection from "@/lib/database"; // Assuming this is the correct path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { email } = req.body;

            await MongoDbConnection.connect();
            const eventsCollection = await MongoDbConnection.getCollection('email_subscription');

            const result = await eventsCollection.findOne({email: email});
            if (result) {
                res.status(400).json({ status: false, message: "email already exist!" });
            } else {
                await eventsCollection.insertOne({email: email});
                res.status(200).json({ status: true, message: "Email subscription successful" });
            }
        } catch (error) {
            console.error("Error during event attendie updated:", error);
            res.status(500).json({ status: false, message: "Something went wrong. Try again" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}