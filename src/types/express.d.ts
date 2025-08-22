// src/types/express.d.ts
// Extendemos el objeto Request de Express
declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
      rol: string;
    };
  }
}