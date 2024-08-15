import { type Config } from "drizzle-kit";

import { databasePrefix } from "@/lib/constants";

export default {
  schema: "./db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: [`${databasePrefix}_*`],
} satisfies Config;
