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

/*
Pulls raw reports from Big Query to local file system for a specified date/time.
*/
'use strict';

function main(...args) {
  const fs = require('fs');
  // Get ISO format date/time of reports to pull from command line argument.
  const fetch_time = args[0]; 
   // [START bigquery_query]
  // [START bigquery_client_default_credentials]
  // Import the Google Cloud client library using default credentials
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();
  // [END bigquery_client_default_credentials]
  async function query() {
    // Query definition with user supplied report date passed in.
    const query = `SELECT report
FROM \`speed-test-286619.lighthouse.raw_reports\`
WHERE EXTRACT(DATE FROM fetch_time) = '${fetch_time}'`;

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

   // Write each report to gist folder and log details to screen.
   // File name is combination of date-time and url.
    rows.forEach(row => {
      // console.log(row.report);
      let repJson = JSON.parse(row.report);
      let repName = `${fetch_time}_${encodeURIComponent(repJson.requestedUrl)}`;
      console.log(repName);
      try {
        fs.writeFileSync(`./gist/${repName}.json`, row.report);
      } catch(e) {
        // statements
        console.log(e);
      }
    });
  }
  // [END bigquery_query]
  query();
}
main(...process.argv.slice(2)); // mandatory arg is date in format YYYY-MM-DD