import dotenv from 'dotenv';
dotenv.config();

import { User } from "@prisma/client";
import app from "./app";

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

app.listen(8000, '192.168.3.7', () => {
    console.log('Servidor Rodando');
});