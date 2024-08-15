import { Connection, Client } from '@temporalio/client';
import { optoutStatus } from './workflows.js';

async function run() {
  const connection = await Connection.connect({
    // // Connect to localhost with default ConnectionOptions.
    // // In production, pass options to the Connection constructor to configure TLS and other settings:
    // address: 'foo.bar.tmprl.cloud', // as provisioned
    // tls: {} // as provisioned
  });


  const client = new Client({
    connection,
    // namespace: 'default', // change if you have a different namespace
  });

  const handle = client.workflow.getHandle('comm-automation');

  await handle.signal(optoutStatus);
  console.log('User has opted out. Stop the SMS Drip campaign workflow');
}


run().catch((err) => {
  console.error(err);
  process.exit(1);
});