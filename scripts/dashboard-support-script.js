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
    const { name, email, digitalId, deptYear, issueType, description, fileData, fileName, fileType } = payload;

    if (!name || !email || !digitalId || !deptYear || !issueType || !description) {
      throw new Error("Missing required fields.");
    }

    // Build the formatted mail body
    let emailBody = "Name: " + name + "\n\n" +
                    "Digital ID: " + digitalId + "\n\n" +
                    "Department & Year: " + deptYear + "\n\n" +
                    "Student Email: " + email + "\n\n" +
                    "Issue Type: " + issueType + "\n\n" +
                    "Issue Description:\n" + description + "\n\n" +
                    "Proof:\n";

    // Configure email options (CC YRC team & Reply-To student)
    const mailOptions = {
      cc: "ssn-yrc-team@googlegroups.com",
      replyTo: email
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
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
