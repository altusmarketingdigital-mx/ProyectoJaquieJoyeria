const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/test', (req, res) => {
  const filePath = "C:\\Users\\miriam.castro\\.gemini\\antigravity-ide\\scratch\\jacqueline-tapia-joyeria\\pdfs\\certificate_50bcba00-8750-4eeb-b564-d6ff4f435352.pdf";
  console.log("File exists?", fs.existsSync(filePath));
  try {
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("sendFile error:", err);
      }
    });
  } catch(e) {
    console.error("Exception:", e);
  }
});

app.listen(4001, () => {
  console.log("Test server on 4001");
});
