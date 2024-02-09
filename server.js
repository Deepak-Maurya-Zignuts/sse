const express = require('express');
const app = express();
const port = 5000;

// Serve HTML page with SSE client script
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// SSE endpoint
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a simple SSE message every second
  const intervalId = setInterval(() => {
    const message = `data: ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
  }, 1000);

  // Close the connection after 10 seconds (for demonstration purposes)
  setTimeout(() => {
    clearInterval(intervalId);
    res.end();
  }, 10000);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
