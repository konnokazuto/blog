import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "shakutaro",
  apiKey: process.env.API_KEY,
});
