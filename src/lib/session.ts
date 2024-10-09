// lib/session.js (or similar)
import { MongoClient } from 'mongodb';
import { IronSession, type SessionOptions, getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';


const mongodbUri = 'mongodb+srv://astrodev:79597959@cluster0.8ylkhdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
interface ExtendedSessionOptions extends SessionOptions {
    store?: any;
}

interface ExtendedRequest extends NextApiRequest {
    session: IronSession<any>;
}

export const sessionOptions: ExtendedSessionOptions = {
    password: '4mi2FuNl5E07lD6CRjzKSTZmMCEb8yptIkCS6',
    cookieName: 'tlg-user-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
    },
};

export function withSession(handler: any) {
    return async (req: ExtendedRequest, res: NextApiResponse) => {
        // Access cookies directly from req.cookies
        const session = await getIronSession(req, res, sessionOptions);

        req.session = session;

        return handler(req, res);
    };
}

export async function getIronSessionData(req: any, res: any) {
    const session = await getIronSession(req, res, sessionOptions);
    return session;
}



async function getMongoStore() {
    const client = await MongoClient.connect(mongodbUri);
    const db = client.db();
    return client.db().collection('sessions'); // Use a dedicated "sessions" collection
}

export interface SessionData {
    user: any;
    isLoggedIn: boolean;
  }

sessionOptions.store = async () => {
    const store = await getMongoStore();
    return {
        async get(sid: any) {
            const session = await store.findOne({ sid });
            return session ? JSON.parse(session.data) : null;
        },
        async set(sid: any, session: any) {
            await store.updateOne(
                { sid },
                { $set: { sid, data: JSON.stringify(session) } },
                { upsert: true }
            );
        },
        async destroy(sid: any) {
            await store.deleteOne({ sid });
        },
    };
};