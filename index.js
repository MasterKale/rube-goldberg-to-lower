const fs = require('fs');
const playwright = require('playwright');
const { createWorker } = require('tesseract.js');

async function toLower (input) {
  const browserType = 'firefox'
  const filename = './lowered.png';

  // Initialize Playwright
  const browser = await playwright[browserType].launch();
  const context = await browser.newContext();

  // Go to a blank page
  const page = await context.newPage();
  await page.goto('about:blank');

  // Convert the text to lowercase
  page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        .input {
          text-transform: lowercase;
        }
      </style>
    </head>
    <body>
      <span class="input">${input}</span>
    </body>
    </html>
  `);

  // Save a screenshot
  await page.screenshot({ path: filename });

  // Close the browser
  await browser.close();

  // Create a new tesseract worker
  const worker = createWorker();

  // Initialize the worker with support for English OCR
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  // Extract the lower-cased text
  const recognition = await worker.recognize(filename);

  // Close the worker
  await worker.terminate();

  // Remove the screenshot
  fs.unlinkSync(filename);

  return recognition.data.text;
}

module.exports = toLower;
