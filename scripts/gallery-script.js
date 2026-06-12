function doGet() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0]; 
    var data = sheet.getDataRange().getValues();
    
    var jsonData = [];
    
    // Adjust startRow if your clean data starts on a different index
    // index 1 assumes row 1 is just the headers
    var startRow = 1; 
    
    for (var i = startRow; i < data.length; i++) {
      var row = data[i];
      var rawUrl = row[0] ? row[0].toString().trim() : ""; // Column A
      var description = row[1] ? row[1].toString().trim() : ""; // Column B
      
      var base64Image = "";
      
      if (rawUrl && (rawUrl.includes("drive.google.com") || rawUrl.includes("id="))) {
        try {
          var fileIdMatch = rawUrl.match(/\/d\/(.*?)\//) || rawUrl.match(/id=(.*?)(&|$)/);
          if (fileIdMatch && fileIdMatch[1]) {
            var fileId = fileIdMatch[1];
            var file = DriveApp.getFileById(fileId);
            
            var blob = file.getBlob();
            var bytes = blob.getBytes();
            var encoded = Utilities.base64Encode(bytes);
            
            base64Image = "data:" + blob.setContentTypeFromExtension().getContentType() + ";base64," + encoded;
          }
        } catch (fileError) {
          // If an individual image fails to load or permissions are bad, 
          // we fallback to the raw URL instead of crashing the whole script
          base64Image = rawUrl; 
        }
      } else {
        base64Image = rawUrl; // Fallback if it's already a direct web URL
      }
      
      if (rawUrl || description) {
        jsonData.push({
          ImageURL: base64Image,
          Description: description
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (globalError) {
    // If something fundamentally snaps, return the exact error text wrapped cleanly inside JSON
    return ContentService.createTextOutput(JSON.stringify({ 
      error: true, 
      message: globalError.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}