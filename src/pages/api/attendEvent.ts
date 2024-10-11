import type { NextApiRequest, NextApiResponse } from "next";
import MongoDbConnection from "@/lib/database"; // Assuming this is the correct path
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { event_id, user_id} = req.body;

            await MongoDbConnection.connect();
            const eventsCollection = await MongoDbConnection.getCollection('events');

            const result = await eventsCollection.findOne({_id: new ObjectId(event_id)});
            if (result) {
                if (!result.attendies.includes(user_id)) {
                    result.attendies.push(user_id);
                    await eventsCollection.updateOne({_id: new ObjectId(event_id)}, { $set: { attendies: result.attendies }});
                    res.status(200).json({ status: true, message: "Event attendee updated successfully" });
                } else {
                    res.status(400).json({ status: false, message: "User is already attending this event" });
                }
            } else {
                res.status(401).json({ status: false, message: "Something went wrong. Try again" });
            }
        } catch (error) {
            console.error("Error during event attendie updated:", error);
            res.status(500).json({ status: false, message: "Something went wrong. Try again" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}