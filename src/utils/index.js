export function parseCsvToJson(csvString) {
  const json = [];
  const csvArray = csvString.split("\n");
  const headers = csvArray.shift().split(",");

  csvArray.forEach(value => {
    const temp = {};
    const row = value.split(",");
    headers.forEach((field, idx) => (temp[field] = row[idx]));
    json.push(temp);
  });

  return json;
}
