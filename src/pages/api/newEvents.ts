import type { NextApiRequest, NextApiResponse } from "next";
import MongoDbConnection from "@/lib/database"; // Assuming this is the correct path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { title, host, venue, time, date} = req.body;

            await MongoDbConnection.connect();
            const eventsCollection = await MongoDbConnection.getCollection('events');

            const newEvent = {
                title: title,
                host: host,
                venue: venue,
                time: time,
                date: date,
                status: 'active',
                attendies: [],
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

            const result = await eventsCollection.insertOne(newEvent);

            if (result.acknowledged && result.insertedId) {
                res.status(200).json({ status: true, message: "New event created successful" });
            } else {
                res.status(401).json({ status: false, message: "Something went wrong. Try again" });
            }
        } catch (error) {
            console.error("Error during event creation:", error);
            res.status(500).json({ status: false, message: "Something went wrong. Try again" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}