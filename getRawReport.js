// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// REPO: https://raw.githubusercontent.com/googleapis/nodejs-bigquery/master/samples/query.js

'use strict';

<<<<<<<< HEAD:getRawReport.js
function main(...args) {
  const fetch_time = args[0]; 
   // [START bigquery_query]
========
const bigQueryQuery = async(sqlExp) => {
  try {
  // [START bigquery_query]
>>>>>>>> 75836e0099fa022274efe340a6c6851e00ac1b71:bigQueryQuery.js
  // [START bigquery_client_default_credentials]
  // Import the Google Cloud client library using default credentials
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();
  // [END bigquery_client_default_credentials]
  async function query() {
    // Query definition with user supplied report date passed in.

<<<<<<<< HEAD:getRawReport.js
    const query = `SELECT report
FROM \`speed-test-286619.lighthouse.raw_reports\`
WHERE EXTRACT(DATE FROM fetch_time) = '${fetch_time}'`;
========
    const query = sqlExp;
>>>>>>>> 75836e0099fa022274efe340a6c6851e00ac1b71:bigQueryQuery.js

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    console.log('Rows:');

    /* TODO **************
    Write files locally as clean JSON, for adding as gists and viewing in Lighthouse.
    ******************* */
    rows.forEach(row => console.log(row));
  }
  // [END bigquery_query]
  query();
<<<<<<<< HEAD:getRawReport.js
}
main(...process.argv.slice(2)); // mandatory arg is date in format YYYY-MM-DD
========
} catch(e) {
    // statements
    console.log(e.errors);
  }
};

module.exports = bigQueryQuery;
>>>>>>>> 75836e0099fa022274efe340a6c6851e00ac1b71:bigQueryQuery.js
