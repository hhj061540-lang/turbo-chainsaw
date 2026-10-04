const express = require('express');
const cors = require('cors');
const app = express();

// Render requires listening on process.env.PORT (defaults to 10000 if not set)
const PORT = process.env.PORT || 10000;

app.use(cors());

// Root route serving inline HTML string
app.get('/', (req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ramgeneratortool</title>
            <style>
                body {
                    font-family: system-ui, sans-serif;
                    background: #0f172a;
                    color: #f8fafc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .box {
                    background: #1e293b;
                    padding: 2.5rem;
                    border-radius: 1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                    text-align: center;
                }
                h1 { margin-top: 0; font-size: 1.5rem; color: #38bdf8; }
                #ram-output { font-size: 1.25rem; font-weight: bold; color: #4ade80; margin-top: 1rem; }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>ramgeneratortool</h1>
                <p>Querying API Endpoint (/api/get-ram)...</p>
                <div id="ram-output">Loading...</div>
            </div>
            <script>
                async function loadRamData() {
                    try {
                        const response = await fetch('/api/get-ram');
                        const data = await response.json();
                        document.getElementById('ram-output').innerText = \`Response: ram_mb = \${data.ram_mb}\`;
                    } catch (err) {
                        document.getElementById('ram-output').innerText = 'Failed to fetch data from API.';
                    }
                }
                loadRamData();
            </script>
        </body>
        </html>
    `;
    res.send(htmlContent);
});

// Required API Endpoint path
app.get('/api/get-ram', (req, res) => {
    res.json({
        ram_mb: 1024
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`ramgeneratortool running on port ${PORT}`);
});
