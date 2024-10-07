import type { NextApiRequest, NextApiResponse } from "next";
import api_service from "@/lib/axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            let { lga_id, state_id, ward_id } = req.query;
            console.log(lga_id, state_id, ward_id);
            const response = await api_service.post("/unitView.php", {lga_id:lga_id, state_id:state_id, ward_id:ward_id});
            
            res.send(response);
        } catch (error: any) {
            // console.error(error.response.data);
            res.status(500).json(error);
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
