import { kv } from "./db.ts";
import { fetchProductData } from "./api.ts";

export async function handleRequest() {
  try {
    const count = await kv.get<bigint>(["task_runs"]);
    const successCount = await kv.get<bigint>(["success"]);
    const data = await fetchProductData();

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Smart Car Availability Checker</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            transition: background-color 0.3s, color 0.3s;
          }
          body.dark-mode {
            background-color: #1a1a1a;
            color: #f0f0f0;
          }
          pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
          }
          .dark-mode pre {
            background-color: #2a2a2a;
            color: #f0f0f0;
          }
          .stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .stat-box {
            background-color: #e9e9e9;
            padding: 10px;
            border-radius: 5px;
          }
          .dark-mode .stat-box {
            background-color: #333;
          }
          #mode-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .dark-mode #mode-toggle {
            background-color: #ffc107;
            color: black;
          }
        </style>
      </head>
      <body>
        <button id="mode-toggle">Toggle Dark Mode</button>
        <h1>Smart Car Availability Checker</h1>
        <div class="stats">
          <div class="stat-box">
            <strong>Total Runs:</strong> ${count.value?.toString() || "0"}
          </div>
          <div class="stat-box">
            <strong>Successful Checks:</strong> ${successCount.value?.toString() || "0"}
          </div>
        </div>
        <h2>Latest Data:</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>

        <script>
          function setDarkMode(isDark) {
            document.body.classList.toggle('dark-mode', isDark);
            localStorage.setItem('darkMode', isDark);
          }

          function toggleDarkMode() {
            const isDark = !document.body.classList.contains('dark-mode');
            setDarkMode(isDark);
          }

          function initDarkMode() {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode !== null) {
              setDarkMode(savedMode === 'true');
            } else {
              setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
            }
          }

          document.getElementById('mode-toggle').addEventListener('click', toggleDarkMode);

          initDarkMode();

          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem('darkMode') === null) {
              setDarkMode(e.matches);
            }
          });
        </script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {"Content-Type": "text/html"},
    });
  } catch (error) {
    console.error("Error serving request:", error);
    return new Response("An error occurred", {status: 500});
  }
}