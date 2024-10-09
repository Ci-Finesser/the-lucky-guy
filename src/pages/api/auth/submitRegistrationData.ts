import type { NextApiRequest, NextApiResponse } from "next";
import MongoDbConnection from "@/lib/database"; // Assuming this is the correct path
import bcrypt from 'bcrypt';
import { SessionData } from "@/lib/session";
import { IronSession } from "iron-session";

interface ExtendedRequest extends NextApiRequest {
    session: IronSession<SessionData>; // Use the IronSession type here
}
export default async function handler(req: ExtendedRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { email, phone, name, password, terms, occupation, lga, poll_unit, ward, bank, accountNumber, nin, vcn } = req.body;

            const saltRounds = 10;
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
                terms: terms,
                occupation: occupation,
                localGovernment: lga,
                poll_unit: poll_unit,
                ward: ward,
                bank: bank,
                accountNumber: accountNumber,
                nin: nin,
                vcn: vcn,
                role: 'user',
                provider: null,
                walletBalance: 0,
                verificationStatus: 'pending',
                dateCreated: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                }),
                dateUpdated: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                })
            };

            const result = await usersCollection.insertOne(newUser);

            if (result.acknowledged) {
                req.session.user = { id: result.insertedId };
                req.session.isLoggedIn = true;
                await req.session.save();
                res.status(200).json({ status: true, message: "Registration successful" });
            } else {
                res.status(401).json({ status: false, message: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ status: false, message: "Something went wrong. Try again" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}