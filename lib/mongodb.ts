import { Client } from "pg";

if (!process.env.POSTGRESQL_URI) {
  throw new Error('Invalid/Missing environment variable: "POSTGRESQL_URI"');
}

const uri = process.env.POSTGRESQL_URI;

let client: Client;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithPostgres = global as typeof globalThis & {
    _postgresClient?: Client;
  };

  if (!globalWithPostgres._postgresClient) {
    globalWithPostgres._postgresClient = new Client({ connectionString: uri });
    globalWithPostgres._postgresClient.connect();
  }
  client = globalWithPostgres._postgresClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new Client({ connectionString: uri });
  client.connect();
}

// Export a module-scoped Client. By doing this in a
// separate module, the client can be shared across functions.
export default client;
