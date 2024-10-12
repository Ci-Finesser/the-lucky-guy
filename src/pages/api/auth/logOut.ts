import type { NextApiRequest, NextApiResponse } from "next";
import { withSession, SessionData } from "@/lib/session";
import { IronSession } from "iron-session";
interface ExtendedRequest extends NextApiRequest {
    session: IronSession<SessionData>; 
}
async function handler(req: ExtendedRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            req.session.destroy(); // This destroys the session
            res.status(200).json({ status: true, message: "Logout successful" });
        } catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({ status: false, message: "Logout failed" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}

export default withSession(handler);