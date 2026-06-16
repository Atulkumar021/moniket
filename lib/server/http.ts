import { NextResponse } from "next/server";
import { connectToDatabase, isDBConnected } from "./db";

// Thrown by route logic to short-circuit with a specific status code.
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(err: unknown) {
  // Mirror the Express errorHandler: map common Mongoose errors to HTTP codes.
  const e = err as { status?: number; code?: number; name?: string; message?: string; keyValue?: Record<string, unknown>; errors?: Record<string, { message: string }> };

  if (e instanceof HttpError) return json({ error: e.message }, e.status);

  if (e?.code === 11000) {
    const field = Object.keys(e.keyValue || {})[0] || "field";
    return json({ error: `Duplicate value for "${field}"` }, 409);
  }
  if (e?.name === "ValidationError" && e.errors) {
    const message = Object.values(e.errors).map((v) => v.message).join(", ");
    return json({ error: message }, 400);
  }
  if (e?.name === "CastError") {
    return json({ error: "Invalid id" }, 400);
  }

  const status = typeof e?.status === "number" ? e.status : 500;
  return json({ error: e?.message || "Server error" }, status);
}

const DB_DOWN_MESSAGE =
  "MongoDB is not connected. If you are using MongoDB Atlas, add your current IP address to Network Access / IP Access List, then restart or wait for the dev server to reconnect.";

// Wrap a route handler: ensure the DB is connected, then run, catching errors.
export function route<Args extends unknown[]>(
  handler: (req: Request, ...args: Args) => Promise<NextResponse> | NextResponse
) {
  return async (req: Request, ...args: Args): Promise<NextResponse> => {
    try {
      await connectToDatabase();
    } catch {
      if (!isDBConnected()) return json({ error: DB_DOWN_MESSAGE }, 503);
    }
    try {
      return await handler(req, ...args);
    } catch (err) {
      return errorResponse(err);
    }
  };
}

// Parse a JSON body, tolerating empty/invalid payloads.
export async function readJson(req: Request): Promise<Record<string, unknown>> {
  return (await req.json().catch(() => ({}))) as Record<string, unknown>;
}

export function searchParams(req: Request): URLSearchParams {
  return new URL(req.url).searchParams;
}
