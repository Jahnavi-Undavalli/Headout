const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.get('/data', (req, res) => {
    const { n, m } = req.query;
    if (!n) {
        return res.status(400).send('Missing "n" query parameter');
    }
    const filePath = `/tmp/data/${n}.txt`;

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        if (m) {
            // Parse line number
            const lineNumber = parseInt(m);
            if (isNaN(lineNumber) || lineNumber <= 0) {
                return res.status(400).send('Invalid line number');
            }

            // Read specific line content
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading file');
                }
                const lines = data.split('\n');
                if (lineNumber > lines.length) {
                    return res.status(400).send('Line number out of range');
                }
                return res.send(lines[lineNumber - 1]);
            });
        } else {
            // Read entire file content
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading file');
                }
                return res.send(data);
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
