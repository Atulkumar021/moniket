import fs from "fs";
import path from "path";
import type { Store } from "@/lib/types";
import { seedStore } from "./data/seed";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "store.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

/** Read the full store, seeding the JSON file on first access. */
export function readStore(): Store {
  ensureDir();
  if (!fs.existsSync(FILE)) {
    const seed = seedStore();
    fs.writeFileSync(FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as Store;
  } catch {
    const seed = seedStore();
    fs.writeFileSync(FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
}

/** Persist the full store back to disk. */
export function writeStore(store: Store): void {
  ensureDir();
  fs.writeFileSync(FILE, JSON.stringify(store, null, 2), "utf8");
}

/** Mutate the store with a callback and persist the result. */
export function mutate<T>(fn: (store: Store) => T): { store: Store; result: T } {
  const store = readStore();
  const result = fn(store);
  writeStore(store);
  return { store, result };
}

/** Allocate the next unique id. */
export function nextId(store: Store): number {
  store.uid += 1;
  return store.uid;
}
