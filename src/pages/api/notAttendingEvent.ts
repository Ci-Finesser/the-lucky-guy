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
                // Check if user_id exists in attendies array
                if (result.attendies.includes(user_id)) {
                    // Remove user_id from attendies array
                    result.attendies = result.attendies.filter((id: any) => id !== user_id); 
                    await eventsCollection.updateOne({_id: new ObjectId(event_id)}, { $set: { attendies: result.attendies }});
                    res.status(200).json({ status: true, message: "User removed from event attendees successfully" });
                } else {
                    res.status(400).json({ status: false, message: "User is not attending this event" });
                }
            } else {
                res.status(404).json({ status: false, message: "Event not found" });
            }
        } catch (error) {
            console.error("Error during event attendee update:", error);
            res.status(500).json({ status: false, message: "Something went wrong. Try again" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}
