import * as XLSX from 'xlsx';

export function convertJSONtoXLSX(jsonData) {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const xlsxFile = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  return new Blob([xlsxFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
