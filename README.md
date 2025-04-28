> [!IMPORTANT]  
> This tool relies on Smart's public JSON API, which may change or be deprecated without notice. If the API endpoint or data structure is updated by Smart, this service might stop working or require adjustments.

# Smart #1 Availability Checker 🚗✨

This project checks if the Smart #1 is available by pulling real-time data directly from Smart's public website API. 

Initially built for a friend who wanted to lease the car but faced extended waiting periods, this tool automatically tracks availability using publicly accessible JSON data provided by Smart. The goal was to immediately notify us via email the moment the vehicle becomes available again, saving a lot of time and effort.

It also doubled as a playground for experimenting with Deno, letting me dive into its runtime, built-in tooling and deployment platform.

The checker sends out instant email alerts, tracks the total number of checks and successful detections, and conveniently displays these stats through a user-friendly web interface.

## Tech Stack 🔧

- **Runtime:** [Deno](https://deno.com/) (hosted on Deno Deploy)
- **Languages & Tools:** TypeScript, Deno's built-in tooling
- **Services:** [Resend](https://resend.com/) for email notifications, HTTP server for statistics display

## Example JSON Response 📄

The Smart website provides JSON data via public API endpoints. Here's an [example URL](https://de.smart.com/__app__/product-summary-app/prod/bff/product-model?envName=prod&preview=false&marketId=de&language=de&productId=HXYES80C51EU000048&efficiencyLabelOneImagesPath=%2Fcontent%2Fdam%2Fsmart%2Fsmart-dam%2Fdigital%2Fproducts%2Fcars%2Fhx1%2Fshared%2Fproduct-detail-summary%2Fenergy-labels%2Fde%2Fde%2FSMART_ENERGYLABEL_%7B%7BPN18%7D%7D_DE_DE.jpg&efficiencyLabelAccessoryPath=SMART_TYRELABEL_%7Bcode%7D):

```jsonc
{
  "price": {
    "currencyIso": "EUR",
    "formattedValue": "41.989,99 €",
    "priceType": "BUY",
    "value": 41989.9949
  },
  "purchasable": true,
  "stock": {
    "earliestBeautifiedLeadTime": "4 - 5 Wochen",
    "stockLevel": 1006,
    "stockLevelStatus": "inStock" // <-- Based on this value an email will be send
  }
}
```

*(Examples available in the `/examples` folder)*

## Project Structure 📂

- **api.ts**: Pulls product data from Smarts API.
- **cron.ts**: Schedules periodic checks for availability.
- **db.ts**: Simple key-value storage to track checks and availability detections.
- **email.ts**: Manages sending email alerts using Resend upon availability.
- **server.ts**: Provides a web interface displaying availability statistics.
- **service.ts**: Initializes everything: setup, cron jobs, HTTP server, etc.

## Quick Setup ⚡️

1. Clone the repo
2. Create a `.env` file with necessary configurations (e.g., Resend API key)
3. Start the checker with:


```bash
deno run --allow-net --allow-env service.ts
```

## Environment Variables 🛠️

> [!NOTE]
> You can specify multiple recipient emails in the `SEND_TO` variable by separating them with commas (e.g., `user1@example.com,user2@example.com`).

Create a `.env` file in the project root with the following entries:

```env
# Product URL
PRODUCT_URL=https://example.com/api/product

# Email addresses to notify (comma-separated; supports multiple recipients)
SEND_TO=recipient1@example.com,recipient2@example.com

# API key for Resend
RESEND_API_KEY=your_resend_api_key_here

# Sender email address
SEND_FROM=sender@example.com
```