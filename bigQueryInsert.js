// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

const insertRowsAsStream = async(datasetId = "lighthouse", tableId = "tbTmpLH", rows) => {
  try {
  // Inserts the JSON objects into my_dataset:my_table.

  // Create a client
  const bigqueryClient = new BigQuery();
  // Insert data into a table
  await bigqueryClient
  .dataset(datasetId)
  .table(tableId)
  .insert(rows);
  console.log(`BigQuery record inserted to: dataset ${datasetId}, table: ${tableId}`);
} catch(e) {
    // statements
    console.log(e.errors);
  }
}

module.exports = insertRowsAsStream