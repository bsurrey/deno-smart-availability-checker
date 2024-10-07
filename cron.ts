import { incrementCounter } from "./db.ts";
import { fetchProductData } from "./api.ts";
import { sendEmailNotification } from "./email.ts";

export async function checkForUpdates() {
  try {
    await incrementCounter(["task_runs"]);

    const data = await fetchProductData();

    if (data?.stock?.status !== 'outOfStock') {
      await incrementCounter(["success"]);
      await sendEmailNotification();
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
}