// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const colors = require('colors'); // Colours for console output

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
  let conslog = `INFO: `.green +  `BigQuery stream record. ` + `Dataset: `.green + `${datasetId} ` + `Table: `.green + `${tableId}`;
  console.log(conslog);
} catch(e) {
    // statements
    console.log(e.errors);
  }
}

module.exports = insertRowsAsStream