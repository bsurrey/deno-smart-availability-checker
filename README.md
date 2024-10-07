# Smart #1 Availability Checker

This service checks the availability of the #1 BRABUS model, sending an email notification if it's available. It also tracks the number of checks performed and successful detections.

## Project Structure

- **api.ts**: Fetches product data.
- **cron.ts**: Implements a scheduled task to check for updates on the product availability.
- **db.ts**: Manages a simple key-value store for counters.
- **email.ts**: Sends an email notification.
- **server.ts**: Serves an HTML page displaying total runs and successful checks, along with the latest product json data.
- **service.ts**: Initializes counters, sets up the cron job to run periodically, and starts the HTTP server.

## Setup

1. Clone this repository
2. Create a `.env` file in the project root
3. Run the service:
    ```bash
    deno run --allow-net --allow-env service.ts
    ```