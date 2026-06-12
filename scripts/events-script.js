function doGet() {
  // Open the active spreadsheet and get the first sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; 
  
  // Get all data from the sheet (rows and columns)
  var data = sheet.getDataRange().getValues();
  
  // Format the data into a JSON array of objects
  var jsonData = [];
  
  // Start from row 4 (index 3) to skip the headers ("SSN YRC", "Event Documentary Reports", and column labels)
  // Or adjust 'startRow' based on where your clean data actually begins
  var startRow = 1; 
  
  for (var i = startRow; i < data.length; i++) {
    var row = data[i];
    
    // Ensure the row has data before adding it
    if (row[0] || row[1]) { 
      jsonData.push({
        date: sheet.getRange(i + 1, 1).getDisplayValue(),
        event: row[1],
        documentaryReport: row[2] ? row[2].toString() : ""
      });
    }
  }
  
  // Return the data as JSON with CORS headers enabled
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}