I encountered several issues while working on my project, which involved writing SQL queries, making API requests with Postman, and scripting in JavaScript:

- **Error: `$.ajax is not a function`**
  - **Issue**: Encountered an error with AJAX code.
  - **Resolution**: Ensured all necessary script links were included before the AJAX code.

- **Error: Cross-Origin Request Blocked**
  - **Issue**: The Same Origin Policy blocked cross-origin requests.
  - **Actions Taken**:
    - Added headers to requests.
    - Installed a CORS extension in the browser.
  - **Resolution**: Realized the issue was due to opening `index.html` directly from the file system. Switching to `localhost` resolved the CORS issue.

- **Issue with JSON Parsing in HTML**
  - **Issue**: JSON data was not parsing correctly in the HTML file.
  - **Cause**: The `dpconnect` file was sending an "Echo connection successful" string, which interfered with JSON parsing.
  - **Resolution**: Corrected the response from the `dpconnect` file to ensure proper JSON parsing.


