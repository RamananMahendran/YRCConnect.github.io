function doGet(e) {
  // 1. Get parameters from React fetch
  const digitalId = e.parameter.digitalId;
  const batch = e.parameter.batch;
  
  if (!digitalId || !batch) {
    return createJsonResponse({ error: true, message: "Missing Digital ID or Batch parameters." });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 2. Access the respective Batch sheet and the Details sheet
  const batchSheet = ss.getSheetByName(`YRC"${batch}`); 
  const detailsSheet = ss.getSheetByName("EVENT DETAILS");

  if (!batchSheet) {
    return createJsonResponse({ error: true, message: "Batch records for '" + batch + "' not found." });
  }
  if (!detailsSheet) {
    return createJsonResponse({ error: true, message: "Event details database not found." });
  }

  // 3. Find the user in the Batch sheet
  const batchData = batchSheet.getDataRange().getValues();
  const headers = batchData[0];
  let userRow = null;
  
  // Assuming Digital ID is in Column B (index 1)
  for (let i = 1; i < batchData.length; i++) {
    if (String(batchData[i][2]) === String(digitalId)) {
      userRow = batchData[i];
      break;
    }
  }

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Digital ID not found in batch records." });
  }

  // 4. Extract basic user info
  // Assuming: Col D (index 3) is Name, Col E (index 4) is Attendance
  const studentName = userRow[3];
  const totalAttendance = userRow[4] || 0;
  const dept = userRow[1] || "Unknown Department";

  // 5. Find which events the user attended
  const attendedEventIds = [];
  // Assuming events start at Column F (index 5)
  for (let col = 5; col < headers.length; col++) {
    const hoursAttended = userRow[col];
    // If the cell contains a number (hours) greater than 0, they attended
    if (hoursAttended && !isNaN(hoursAttended) && hoursAttended > 0) {
      attendedEventIds.push(headers[col]); 
    }
  }

  // 6. Map Event IDs to Event Details from the 'details' tab
  const detailsData = detailsSheet.getDataRange().getValues();
  const attendedEventsList = [];
  
  // Loop through attended event IDs and find their details
  attendedEventIds.forEach(eventId => {
    let eventFound = false;
    // Skip details header row
    for (let j = 3; j < detailsData.length; j++) {
      // Assuming Event ID is in Col B (index 1) of 'details' tab
      if (String(detailsData[j][1]) === String(eventId)) {
        attendedEventsList.push({
          id: eventId,
          name: detailsData[j][2] || "Unnamed Event",     // Col C
          date: formatDate(detailsData[j][3]) || "",      // Col D
          pdfLink: detailsData[j][6] || ""                // Col G
        });
        eventFound = true;
        break;
      }
    }
    
    // Fallback if event is in the batch header but missing from 'details' tab
    if (!eventFound) {
      attendedEventsList.push({
        id: eventId,
        name: "Unknown Event",
        date: "",
        pdfLink: ""
      });
    }
  });

  // 7. Return the final payload
  const responsePayload = {
    error: false,
    name: studentName,
    dept: dept,
    attendance: totalAttendance,
    events: attendedEventsList
  };

  return createJsonResponse(responsePayload);
}

// Helper function to format dates correctly for JSON
function formatDate(dateObj) {
  if (!dateObj) return "";
  if (dateObj instanceof Date) {
    // Formats to DD/MM/YYYY or your preferred format
    return Utilities.formatDate(dateObj, Session.getScriptTimeZone(), "MMMM dd, yyyy");
  }
  return String(dateObj);
}

// Helper function to output JSON
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}