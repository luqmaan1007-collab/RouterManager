const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// API to Scan Devices (Runs your C "discover" code)
app.get('/scan', (req, res) => {
    // This executes your compiled C binary
    exec('./discover_devices', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }
        // Assuming your C code prints JSON or simple text, parse it here
        res.json({ devices: stdout });
    });
});

// API to Block MAC (Runs your C++ "block" code)
app.get('/block/:mac', (req, res) => {
    const mac = req.params.mac;
    exec(`./router_manager block ${mac}`, (error, stdout, stderr) => {
        if (error) return res.status(500).send(stderr);
        res.send(`Blocked ${mac}`);
    });
});

app.listen(port, () => console.log(`Router backend running on port ${port}`));

