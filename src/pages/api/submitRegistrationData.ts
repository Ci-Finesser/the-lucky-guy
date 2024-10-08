import type { NextApiRequest, NextApiResponse } from "next";
import MongoDbConnection from "@/lib/database"; // Assuming this is the correct path
import bcrypt from 'bcrypt';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { email, phone, name, password } = req.body;
            // log email, password
            console.log(`Email: ${email}, Password: ${password}`);

            const saltRounds = 10; // Adjust as needed for security
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await MongoDbConnection.connect();
            const usersCollection = await MongoDbConnection.getCollection('users');

            const existingUser = await usersCollection.findOne({ email: email });

            if (existingUser) {
                return res.status(400).json({ status: false, message: "User with this email already exists" });
            }

            const newUser = {
                email: email,
                phone: phone,
                name: name,
                password: hashedPassword,
                // ... other registration fields
            };

            const result = await usersCollection.insertOne(newUser);

            if (result.acknowledged) {
                res.status(200).json({ status: true, message: "Login successful" });
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