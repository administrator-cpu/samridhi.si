import 'server-only';
import { MongoClient, type Collection, type Document } from 'mongodb';

// One client per server process (and one across dev hot reloads).
const g = globalThis as unknown as { _mongo?: Promise<MongoClient>; _indexes?: Promise<unknown> };

function client() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!g._mongo) {
    g._mongo = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 10000 }).connect().catch(err => {
      g._mongo = undefined; // allow a retry on the next request
      throw err;
    });
  }
  return g._mongo;
}

export async function registrations(): Promise<Collection<Document>> {
  const c = (await client()).db(process.env.MONGODB_DB || 'samridhi').collection('registrations');
  if (!g._indexes) {
    g._indexes = Promise.all([
      c.createIndex({ idempotencyKey: 1 }, { unique: true, partialFilterExpression: { idempotencyKey: { $type: 'string' } } }),
      c.createIndex({ createdAt: -1 }),
      c.createIndex({ phone: 1 })
    ]).catch(err => {
      g._indexes = undefined;
      throw err;
    });
  }
  await g._indexes;
  return c;
}
