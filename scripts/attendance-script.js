function doGet(e) {
  try {
    var digitalId = e.parameter.digitalId;
    var department = e.parameter.department;
    
    if (!digitalId || !department) {
      return createJsonResponse({ error: true, message: "Missing Digital ID or Department parameters." });
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Target Department Sheet
    var deptSheet = ss.getSheetByName(department.trim());
    if (!deptSheet) {
      return createJsonResponse({ error: true, message: "Department tab '" + department + "' not found in spreadsheet config." });
    }
    
    var deptData = deptSheet.getDataRange().getValues();
    
    // Dynamically discover the main table header row by searching for "digital id"
    var headerRowIndex = -1;
    for (var r = 0; r < Math.min(deptData.length, 10); r++) {
      for (var c = 0; c < deptData[r].length; c++) {
        if (deptData[r][c] && deptData[r][c].toString().toLowerCase().trim() === "digital id") {
          headerRowIndex = r;
          break;
        }
      }
      if (headerRowIndex !== -1) break;
    }
    
    // Fallback block if table headers cannot be programmatically inferred
    if (headerRowIndex === -1) {
       headerRowIndex = 5; // Default index offset for 5 rows above header
    }
    
    var headers = deptData[headerRowIndex];
    var idColIndex = headers.findIndex(h => h.toString().toLowerCase().trim() === "digital id");
    
    // Scan for attendance summary metrics or map via event ratios
    var attendanceColIndex = headers.findIndex(h => h.toString().toLowerCase().trim().includes("attendance") || h.toString().toLowerCase().trim().includes("%"));
    
    if (idColIndex === -1) {
      return createJsonResponse({ error: true, message: "Could not find 'Digital ID' column in layout map index." });
    }
    
    // 2. Identify Target Student Record
    var volunteerRow = null;
    for (var i = headerRowIndex + 1; i < deptData.length; i++) {
      if (deptData[i][idColIndex] && deptData[i][idColIndex].toString().trim().toLowerCase() === digitalId.trim().toLowerCase()) {
        volunteerRow = deptData[i];
        break;
      }
    }
    
    if (!volunteerRow) {
      return createJsonResponse({ error: true, message: "Volunteer profile record not found for ID: " + digitalId });
    }
    
    // Compute or read tracking metric
    var attendanceValue = "0%";
    if (attendanceColIndex !== -1 && volunteerRow[attendanceColIndex]) {
      attendanceValue = volunteerRow[attendanceColIndex].toString();
    }
    
    // Identify individual columns containing positive attendance markers
    var attendedEventIds = [];
    for (var j = 0; j < headers.length; j++) {
      if (j !== idColIndex && j !== attendanceColIndex && headers[j] && j > idColIndex) {
        var marker = volunteerRow[j] ? volunteerRow[j].toString().trim().toLowerCase() : "";
        // Checks for flags matching "1", "p", or numerical tallies
        if (marker === "1" || marker === "p" || (Number(marker) && Number(marker) > 0)) {
          var cleanedEventId = headers[j].toString().trim();
          if (cleanedEventId) {
            attendedEventIds.push(cleanedEventId);
          }
        }
      }
    }
    
    // 3. Map to Event Details Tab (parsing row offsets)
    var eventsList = [];
    var detailsSheet = ss.getSheetByName("EVENT DETAILS");
    
    if (detailsSheet && attendedEventIds.length > 0) {
      var detailsData = detailsSheet.getDataRange().getDisplayValues();
      
      // Discover header mapping row dynamically
      var detailsHeaderIndex = -1;
      for (var dr = 0; dr < Math.min(detailsData.length, 6); dr++) {
        for (var dc = 0; dc < detailsData[dr].length; dc++) {
          if (detailsData[dr][dc] && detailsData[dr][dc].toString().toLowerCase().trim() === "EVENT CODE") {
            detailsHeaderIndex = dr;
            break;
          }
        }
        if (detailsHeaderIndex !== -1) break;
      }
      
      if (detailsHeaderIndex === -1) detailsHeaderIndex = 3; // Fallback index mapping row 4
      
      var detailsHeaders = detailsData[detailsHeaderIndex];
      var detailIdIndex = detailsHeaders.findIndex(h => h.toString().toLowerCase().trim() === "event code");
      var detailNameIndex = detailsHeaders.findIndex(h => h.toString().toLowerCase().trim() === "name");
      var detailDescIndex = detailsHeaders.findIndex(h => h.toString().toLowerCase().trim() === "date" || h.toString().toLowerCase().trim() === "details");
      
      // ... [Keep the top half of your doGet function exactly the same] ...

      var eventMap = {};
      for (var k = detailsHeaderIndex + 1; k < detailsData.length; k++) {
        var rowId = detailsData[k][detailIdIndex];
        if (rowId) {
          // Clean the ID by forcing lowercase and stripping trailing/leading whitespace
          var cleanRowId = rowId.toString().trim().toLowerCase();
          
          eventMap[cleanRowId] = {
            name: detailNameIndex !== -1 && detailsData[k][detailNameIndex] ? detailsData[k][detailNameIndex].toString().trim() : "YRC Event Asset",
            description: detailDescIndex !== -1 && detailsData[k][detailDescIndex] ? detailsData[k][detailDescIndex].toString().trim() : "No structural description text defined."
          };
        }
      }
      
      // Compile final lookup mappings
      attendedEventIds.forEach(function(id) {
        // Clean the target search key identically
        var lookupKey = id.toString().trim().toLowerCase();
        
        if (eventMap[lookupKey]) {
          eventsList.push({
            id: id,
            name: eventMap[lookupKey].name,
            description: eventMap[lookupKey].description
          });
        } else {
          eventsList.push({
            id: id,
            name: "Event ID Match (" + id + ")",
            description: "No description found at details tab"
          });
        }
      });
    } else if (attendedEventIds.length > 0) {
      eventsList = attendedEventIds.map(id => ({ id: id, name: "Event Reference ID: " + id, description: "Detailed summary logs offline." }));
    }
    
    // Calculate a dynamic percentage fallback count if explicit metrics columns are absent
    if (attendanceValue === "0%" && attendedEventIds.length > 0) {
      attendanceValue = attendedEventIds.length + " Verified Event(s) Attended";
    }
    
    return createJsonResponse({
      success: true,
      attendance: attendanceValue,
      events: eventsList
    });
    
  } catch (err) {
    return createJsonResponse({ error: true, message: "Server parsing runtime error: " + err.toString() });
  }
}

function createJsonResponse(outputObject) {
  return ContentService.createTextOutput(JSON.stringify(outputObject))
    .setMimeType(ContentService.MimeType.JSON);
}