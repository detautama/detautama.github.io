---
title: "Capturing and Storing Request Headers in a Chrome Extension"
date: "2025-02-25"
description: "Learn how to capture and store request headers in a Chrome extension using webRequest API."
tag: "Chrome Extension"
featured: false
---

When developing Chrome extensions, you might need to intercept network requests to capture specific headers. In this tutorial, we'll go through a simple Chrome extension script that listens to outgoing requests, extracts a specific authentication header, and stores it in Chrome's local storage.

## Prerequisites

Before we begin, ensure you have basic knowledge of JavaScript and Chrome Extensions. You'll also need a working Chrome extension with appropriate permissions.

## The Code

Here’s a script that uses the `chrome.webRequest.onBeforeSendHeaders` API to listen for requests made to `https://qa.example.com/`. When such a request is detected, the script clears local storage, extracts the `X-Example-Token` header, and saves it with a timestamp.

```javascript
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    // Clear local storage
    chrome.storage.local.clear(() => {
      console.log("Local storage cleared.");

      console.log(details);
      // Only process requests to the specific URL
      if (details.url.startsWith("https://qa.example.com/")) {
        // Filter the "X-Example-Token" header from request headers
        const authHeader = details.requestHeaders.find(
          (header) => header.name.toLowerCase() === "x-example-token"
        );

        if (authHeader) {
          const authValue = authHeader.value;
          console.log(
            `Captured X-Example-Token for ${details.url}: ${authValue}`
          );

          // Save the captured value to storage
          chrome.storage.local.set({
            [details.url]: {
              authToken: authValue,
              time: new Date().toLocaleString(),
            },
          });
        }
      }
    });
  },
  { urls: ["https://qa.example.com/*"] }, // Filter only this URL
  ["requestHeaders"]
);
```

## Updated Manifest (Manifest V3)

To use `chrome.webRequest`, update your `manifest.json` file to Manifest V3 format:

```json
{
  "manifest_version": 3,
  "name": "Auth Token Capturer",
  "version": "1.0",
  "permissions": ["webRequest", "storage"],
  "host_permissions": ["https://qa.example.com/*"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    }
  }
}
```

## Testing the Script

1. Load the unpacked extension in Chrome.
2. Open DevTools (`F12` or `Ctrl+Shift+I`) and go to the **Console** tab.
3. Navigate to `https://qa.example.com/` and trigger a request.
4. Check the console for logs indicating that the `X-Example-Token` header was captured and stored.
5. Verify the stored value in Chrome’s local storage using `chrome.storage.local.get(null, console.log);` in the DevTools console.

## Important Note

This extension is intended for development and debugging purposes only. It should not be used in production environments, as it captures authentication tokens that could pose security risks if mishandled.

## Conclusion

This approach is useful for debugging, logging, or handling authentication tokens in a Chrome extension. Ensure you handle sensitive data securely, especially if dealing with authentication headers.

Happy coding!
