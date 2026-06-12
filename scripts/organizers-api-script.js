/**
 * Google Apps Script - YRC Organizers Directory API (With Batch Switcher)
 * 
 * Instructions:
 * 1. Open script.google.com and sign in.
 * 2. Open the Google Apps Script project for your YRC Organizers sheet.
 * 3. Replace your existing code with this script.
 * 4. Save the project (Ctrl+S).
 * 5. Click "Deploy" -> "Manage deployments" -> Edit (pencil icon) the current active deployment,
 *    and select Version: "New version" to publish these changes.
 * 6. Click "Deploy".
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Extract 'batch' parameter from the URL query. Default to "2026".
    var batch = e && e.parameter && e.parameter.batch ? e.parameter.batch : "2026";
    
    // Map batch to sheet index:
    // Batch 2026 -> 2nd tab (index 1)
    // Batch 2025 -> 3rd tab (index 2)
    // Batch 2024 -> 4th tab (index 3)
    // Batch 2023 -> 5th tab (index 4)
    // Batch 2022 -> 6th tab (index 5)
    var sheetIndex = 1; // Default index
    
    switch (batch) {
      case "2026":
        sheetIndex = 1;
        break;
      case "2025":
        sheetIndex = 2;
        break;
      case "2024":
        sheetIndex = 3;
        break;
      case "2023":
        sheetIndex = 4;
        break;
      case "2022":
        sheetIndex = 5;
        break;
      default:
        sheetIndex = 1; // Fallback to 2026
    }
    
    var sheet = ss.getSheets()[sheetIndex];
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: true, message: "Sheet tab for batch " + batch + " not found." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Using getDisplayValues() to perfectly preserve cell phone formats and strings
    var data = sheet.getDataRange().getDisplayValues();
    var headers = data[2]; // Headers are on row 3 (0-indexed 2)
    
    // Map column indices automatically based on headers
    var nameIdx = headers.findIndex(h => h.toLowerCase().trim() === "name");
    var roleIdx = headers.findIndex(h => h.toLowerCase().trim() === "domain");
    var phoneIdx = headers.findIndex(h => h.toLowerCase().trim() === "profile link");
    var emailIdx = headers.findIndex(h => h.toLowerCase().trim() === "email");
    
    var organizers = [];
    for (var i = 3; i < data.length; i++) {
      if (data[i][nameIdx]) { // Only add if a name exists
        organizers.push({
          name: data[i][nameIdx],
          role: roleIdx !== -1 ? data[i][roleIdx] : "Organizer",
          phone: phoneIdx !== -1 ? data[i][phoneIdx] : "",
          email: emailIdx !== -1 ? data[i][emailIdx] : ""
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify(organizers))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: true, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
