import { Connection, Client } from '@temporalio/client';
import { runDripCampaign } from './workflows.js';
import { nanoid } from 'nanoid';

async function run() {
  const connection = await Connection.connect({
    // // Connect to localhost with default ConnectionOptions.
    // // In production, pass options to the Connection constructor to configure TLS and other settings:
    // address: 'foo.bar.tmprl.cloud', // as provisioned
    // tls: {} // as provisioned
  });

  const contactData = JSON.stringify({"firstName":"Garima",
  "lastName":"Gupta", 
  "workMobilePhone1":"4254445589", 
  "workEmailAddress1":"garimaggupta@gmail.com", 
  "workCountry":"United States", 
  "timezone": -7,
  "messagingoptions": [
    {
      "channel": "sms",
      "enabled": true,
      "primary": "WorkMobilePhone1",
      "secondary": "WorkMobilePhone1",
      "tertiary": "WorkMobilePhone1"
    },
    {
      "channel": "email",
      "enabled": true,
      "primary": "WorkEmailAddress1",
      "secondary": "WorkEmailAddress1",
      "tertiary": "WorkEmailAddress1"
    }
  ]})

  const client = new Client({
    connection,
    // namespace: 'default', // change if you have a different namespace
  });

  // Invoke the `runDripCampaign` Workflow, only resolved when the workflow completes
  const result = await client.workflow.execute(runDripCampaign, {
    taskQueue: 'SMS-Drip-Campaign',
    workflowId: 'comm-automation',
    args: [contactData],
  });
  console.log(result); 
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});