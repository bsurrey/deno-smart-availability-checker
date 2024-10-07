import {serve} from "https://deno.land/std/http/server.ts";
import {initializeCounters} from "./db.ts";
import {checkForUpdates} from "./cron.ts";
import {handleRequest} from "./server.ts";

// Initialize counters if they don't exist
await initializeCounters()

// Set up cron job
Deno.cron("Check for updates", "* * * * *", checkForUpdates);

// Start the server
serve(handleRequest);