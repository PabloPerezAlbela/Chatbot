// Copyright 2020 Google LLC
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

'use strict';

async function main(projectId, location, agentId, query, languageCode) {
  // [START dialogflow_cx_detect_intent_text]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
   const projectId = 'project1-379221';
   const location = 'global';
   const agentId = 'ee65a5ce-dca5-4dbb-8874-3ef5919fd538';
   const query = 'Hello';
   const languageCode = 'es'

  // Imports the Google Cloud Some API library
  const {SessionsClient} = require('@google-cloud/dialogflow-cx');
  /**
   * Example for regional endpoint:
   *   const location = 'us-central1'
   *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
   */
  const client = new SessionsClient();

  async function detectIntentText() {
    const sessionId = Math.random().toString(36).substring(7);
    const sessionPath = client.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
        },
        languageCode,
      },
    };
    const [response] = await client.detectIntent(request);
    for (const message of response.queryResult.responseMessages) {
      if (message.text) {
        console.log(`Agent Response: ${message.text.text}`);
      }
    }
    if (response.queryResult.match.intent) {
      console.log(
        `Matched Intent: ${response.queryResult.match.intent.displayName}`
      );
    }
    console.log(
      `Current Page: ${response.queryResult.currentPage.displayName}`
    );
  }

  detectIntentText();
  // [END dialogflow_cx_detect_intent_text]
}

main(...process.argv.slice(2));
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});