import type { NextApiRequest, NextApiResponse } from "next";
import MongoDbConnection from "@/lib/database"; // Assuming this is the correct path
import bcrypt from 'bcrypt'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;
            // log email, password
            console.log(`Email: ${email}, Password: ${password}`);

            await MongoDbConnection.connect();
            const usersCollection = await MongoDbConnection.getCollection('users');

            const user = await usersCollection.findOne({ email: email });

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password); 
                if (passwordMatch) {
                  res.status(200).json({ status: true, message: "Login successful" });
                } else {
                  res.status(401).json({ status: false, message: "Invalid credentials" });
                }
              } else {
                res.status(401).json({ status: false, message: "Invalid credentials" });
              }
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}