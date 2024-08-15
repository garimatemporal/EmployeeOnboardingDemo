import axios from 'axios';
import 'dotenv/config'

export async function createContact(contactData) {
  let res = '';
  let url = "https://api.us.whispir.com/workspaces/"+ process.env.workspaceID + "/contacts";
 
  //console.log(contactData);
  
  const config = {
    method: "post",
    url: url,
    data: contactData,
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.uname + ':' + process.env.pword).toString('base64'),
      'Accept':'application/vnd.whispir.contact-v1+json',
      'Content-Type':'application/vnd.whispir.contact-v1+json',
      'x-api-key':process.env.apikey
  }
  };

  try {
    res = await axios(config);
  } catch (error) {
    console.log(error);
    console.log("Error creating contact");
    return error;
  }

  console.log(res.data.mri)
  return res.data.mri
}

export async function sendMessage(contactMRI, templateName) {

  let res = '';
  let url = "https://api.us.whispir.com/workspaces/"+ process.env.workspaceID + "/messages"; 
  
  const config = {
    method: "post",
    url: url,
    data: {"to":contactMRI,"messageTemplateName":templateName},
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.uname + ':' + process.env.pword).toString('base64'),
      'Accept':'application/vnd.whispir.message-v1+json',
      'Content-Type':'application/vnd.whispir.message-v1+json',
      'x-api-key':process.env.apikey
  }
  };

  try {
    res = await axios(config);
  } catch (error) {
    console.log(error);
    console.log("Error sending the message with template name: " + templateName);
    return error;
  }

  console.log(res.data + " for sending template: " + templateName)
  return res.data + "for sending template: " + templateName

}