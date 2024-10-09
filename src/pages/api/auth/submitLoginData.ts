import type { NextApiRequest, NextApiResponse } from "next";
import MongoDbConnection from "@/lib/database"; 
import bcrypt from 'bcrypt'; 
import { SessionData, withSession } from "@/lib/session";
import { IronSession } from "iron-session";
interface ExtendedRequest extends NextApiRequest {
  session: IronSession<SessionData>; // Use the IronSession type here
}
async function handler(req: ExtendedRequest, res: NextApiResponse) {
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
                  req.session.user = {id: user._id, email: user.email, password: passwordMatch};
                  req.session.isLoggedIn = true;
                  await req.session.save();
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


export default withSession(handler); 