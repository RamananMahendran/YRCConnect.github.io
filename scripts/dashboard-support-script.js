/**
 * Google Apps Script - SSN YRC Dashboard Support Form Handler
 * 
 * Instructions:
 * 1. Open Google Drive (drive.google.com) and sign in.
 * 2. Create a new Google Apps Script project (or go to script.google.com).
 * 3. Delete any code in the editor and paste this code.
 * 4. Save the project (Ctrl+S).
 * 5. Click "Deploy" -> "New deployment".
 * 6. Under "Select type", select "Web app".
 * 7. Set:
 *    - Description: "YRC Dashboard Support Email Service"
 *    - Execute as: "Me" (your-email@gmail.com)
 *    - Who has access: "Anyone" (This is required so your React frontend can POST to it).
 * 8. Click "Deploy". Authorize permissions if prompted (Go to Advanced -> Go to Untitled project (unsafe) -> Allow).
 * 9. Copy the Web App URL (ends in /exec) and paste it as `DASHBOARD_SUPPORT_API_URL` in `src/components/ContactPage.js`.
 */

function doGet(e) {
  return ContentService.createTextOutput("YRC Dashboard Support API is active. Use POST to submit data.")
                       .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  // Setup CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No data received in post body.");
    }

    const payload = JSON.parse(e.postData.contents);
    const { name, digitalId, deptYear, issueType, description, fileData, fileName, fileType } = payload;

    if (!name || !digitalId || !deptYear || !issueType || !description) {
      throw new Error("Missing required fields.");
    }

    // Build the formatted mail body
    let emailBody = "Name: " + name + "\n\n" +
                    "Digital ID: " + digitalId + "\n\n" +
                    "Department & Year: " + deptYear + "\n\n" +
                    "Issue Type: " + issueType + "\n\n" +
                    "Issue Description:\n" + description + "\n\n" +
                    "Proof:\n";

    const mailOptions = {
      cc: "ssn-yrc-team@googlegroups.com"
    };

    // Attach file if uploaded
    if (fileData && fileName && fileType) {
      // Decode base64 file data. Data URL format is: "data:image/png;base64,iVBORw0KGgo..."
      const splitData = fileData.split(",");
      const base64Content = splitData.length > 1 ? splitData[1] : splitData[0];
      const decodedBytes = Utilities.base64Decode(base64Content);
      const blob = Utilities.newBlob(decodedBytes, fileType, fileName);
      
      mailOptions.attachments = [blob];
      emailBody += fileName + " (attached)";
    } else {
      emailBody += "None";
    }

    // Send the email
    const subject = "SSN YRC Dashboard Support: " + issueType + " - " + name + " (" + digitalId + ")";
    const recipient = "youthredcross@ssn.edu.in";

    MailApp.sendEmail(recipient, subject, emailBody, mailOptions);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeaders(headers);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeaders(headers);
  }
}

// Handle preflight OPTIONS requests for CORS if needed
function doOptions(e) {
  return ContentService.createTextOutput("")
                       .setMimeType(ContentService.MimeType.TEXT)
                       .setHeaders({
                         "Access-Control-Allow-Origin": "*",
                         "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                         "Access-Control-Allow-Headers": "Content-Type"
                       });
}
