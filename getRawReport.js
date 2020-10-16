const bigQueryQuery = require("./bigQueryQuery");
bigQueryQuery(`SELECT report FROM \`speed-test-286619.lighthouse.raw_reports\` WHERE fetch_time = '2020-10-16 15:47:54.122 UTC'`);