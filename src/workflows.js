import { proxyActivities, sleep, defineSignal, setHandler, log } from '@temporalio/workflow';

const { createContact, sendMessage } = proxyActivities({
  startToCloseTimeout: '1 minute',
  retry: {
    // default retry policy if not specified
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: 2,
    maximumInterval: '100s',
    nonRetryableErrorTypes: ['400','422']
  },
});

/** Signal Handler to handle the opt out signal from end user */
export const optoutStatus = defineSignal('update-optin-status');

/** A workflow that simply calls an activity */
export async function runDripCampaign(contactData) {

  let opted_out = false
  let templateName  = ''

  setHandler(optoutStatus, () => void (opted_out = true));

   const contactMRI = await createContact(contactData);
   await sleep('10s')
   
   templateName = "Initial Template"
   await sendMessage(contactMRI,templateName);

   await sleep ('30s')    //await sleep ("1 day")

   if(!opted_out){
    templateName = "Message Day 1"
    await sendMessage(contactMRI,templateName);
   }
   else {
    log.info('Stopping the Drip campaign, opt out signal for user ' + contactMRI + ' received') 
    return ('Stopping drip campaign, optout signal received after sending ' + templateName)
   }
    
   await sleep ('30s')    // await sleep ("5 days")

   if(!opted_out){
    templateName = "Message Week 1"
    await sendMessage(contactMRI,templateName);
   }
   else {
    log.info('Stopping the Drip campaign, opt out signal for user ' + contactMRI + ' received') 
    log.info ('Last template sent ' +  templateName)
    return ('Stopping drip campaign, optout signal received after sending ' + templateName)
   }

   await sleep ('30s')   // await sleep ("25 days")

   if(!opted_out){
    templateName = "Message Day 30"
    await sendMessage(contactMRI,templateName);
   }
   else {
    log.info('Stopping the Drip campaign, opt out signal for user ' + contactMRI + ' received') 
    log.info ('Last template sent ' +  templateName)
    return ('Stopping drip campaign, optout signal received after sending ' + templateName)
   }

   await sleep ('30s')   //await sleep ("60 days")

   if(!opted_out){
    templateName = "Message Day 90"
    await sendMessage(contactMRI,templateName);
   }
   else {
    log.info('Stopping the Drip campaign, opt out signal for user ' + contactMRI + ' received') 
    log.info ('Last template sent ' +  templateName)
    return ('Stopping drip campaign, optout signal received after sending ' + templateName)
   }

return "SMS Drip Campaign Completed"
}
