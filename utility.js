const XLSX = require("xlsx");

function readDataFile(book) {
  console.log("test");
  const bookData = XLSX.readFile(book);
  if (bookData.SheetNames.length <= 0) {
    throw new Error(`${book} does not exist!`);
  }
  const sheetRaw = bookData.Sheets[bookData.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheetRaw);
}

module.exports = { readDataFile };
