require('dotenv').config();

const axios = require('axios');

// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const { App, LogLevel } = require("@slack/bolt");


// console.log("my tok " + process.env.SLACK_SIGNING_SECRET)
const app = new App({
  token: process.env.SLACK_ACCESS_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

app.command('/stock', async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();
  
    const result = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${command.text}&apikey=${process.env.API_KEY}`
  );
  const lastRefreshed = result.data["Meta Data"]["3. Last Refreshed"];
  const lastClose = result.data["Time Series (Daily)"][lastRefreshed]["4. close"];
  // console.log("REST ", result)
  
  // const lastClose =  "TESTY"
  // // const lastRefreshed = result["Meta Data"]["3. Last Refreshed"];
  // // const lastClose = result["Time Series (Daily)"][lastRefreshed]["4. close"];
  
  
  await say(`${command.text} last closed at ${lastClose}`);
});


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();



// try {
//   // Call views.update with the built-in client
//   const result = await client.views.update({
//     // Pass the view_id
//     view_id: body.view.id,
//     // Pass the current hash to avoid race conditions
//     hash: body.view.hash,
//     // View payload with updated blocks
//     view: {
//       type: 'modal',
//       // View identifier
//       callback_id: 'view_1',
//       title: {
//         type: 'plain_text',
//         text: 'Updated modal'
//       },
//       blocks: [
//         {
//           type: 'section',
//           text: {
//             type: 'plain_text',
//             text: 'You updated the modal!'
//           }
//         },
//         {
//           type: 'image',
//           image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
//           alt_text: 'Yay! The modal was updated'
//         }
//       ]
//     }
//   });
//   console.log(result);
// }
// catch (error) {
//   console.error(error);
// }
// });




// // Require the Bolt for JavaScript package (github.com/slackapi/bolt)
// require('dotenv').config();
// const { App, LogLevel } = require("@slack/bolt");
// const axios = require('axios');
// // var express = require('express');

// // var appMain = express();
// // appMain.get('/', function(req, res) {
// //   res.send('Ngrok is working! Path Hit: ' + req.url);
// // });

// const app = new App({
//   token: process.env.SLACK_ACCESS_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   // LogLevel can be imported and used to make debugging simpler
//   logLevel: LogLevel.DEBUG
// });




// // The open_modal shortcut opens a plain old modal
// // Shortcuts require the command scope
// app.command('/checkstock', async ({ ack, payload, client }) => {
//   // Acknowledge shortcut request
//   console.log ("my payload: "+ JSON.stringify(payload))
//   ack();

//   try {
//     // Call the views.open method using the built-in WebClient
//     // The client uses the token you used to initialize the app
//     const result = await app.client.views.open({
//       trigger_id: payload.trigger_id,
//       view: {
//         "type": "modal",
//         "title": {
//           "type": "plain_text",
//           "text": "My App"
//         },
//         "close": {
//           "type": "plain_text",
//           "text": "Close"
//         },
//         "blocks": [
//           {
//             "type": "section",
//             "text": {
//               "type": "mrkdwn",
//               "text": "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
//             }
//           },
//           {
//             "type": "context",
//             "elements": [
//               {
//                 "type": "mrkdwn",
//                 "text": "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
//               }
//             ]
//           }
//         ]
//       }
//     });

//     console.log(result);
//   }
//   catch (error) {
//     console.error(error);
//   }
// });

// (async () => {
//   // Start your app
//   await app.start(process.env.PORT || 3000);

//   console.log("⚡️ Bolt app is running!");
// })();

// // // Require the Bolt package (github.com/slackapi/bolt)
// // const { App } = require("@slack/bolt");

// // const app = new App({
// //   token: process.env.SLACK_BOT_TOKEN,
// //   signingSecret: process.env.SLACK_SIGNING_SECRET
// // });



// // // All the room in the world for your code
// // (async () => {
// //   // Start your app
// //   await app.start(process.env.PORT || 3000);

// //   console.log('⚡️ Bolt app is running!');
// // })();

// require('dotenv').config();

// const axios = require('axios');
// const express = require('express');
// const bodyParser = require('body-parser');
// const qs = require('querystring');
// const ticket = require('./ticket');
// const signature = require('./verifySignature');
// const debug = require('debug')('slash-command-template:index');

// const apiUrl = 'https://slack.com/api';

// const app = express();

// /*
//  * Parse application/x-www-form-urlencoded && application/json
//  * Use body-parser's `verify` callback to export a parsed raw body
//  * that you need to use to verify the signature
//  */

// const rawBodyBuffer = (req, res, buf, encoding) => {
//   if (buf && buf.length) {
//     req.rawBody = buf.toString(encoding || 'utf8');
//   }
// };

// app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
// app.use(bodyParser.json({ verify: rawBodyBuffer }));

// app.get('/', (req, res) => {
//   res.send('<h2>The Slash Command and Dialog app is running</h2> <p>Follow the' +
//   ' instructions in the README to configure the Slack App and your environment variables.</p>');
// });

// /*
//  * Endpoint to receive /helpdesk slash command from Slack.
//  * Checks verification token and opens a dialog to capture more info.
//  */
// app.post('/command', (req, res) => {
//   // extract the slash command text, and trigger ID from payload
//   const { text, trigger_id } = req.body;

//   // Verify the signing secret
//   if (signature.isVerified(req)) {
//     // create the dialog payload - includes the dialog structure, Slack API token,
//     // and trigger ID
//     const view = {
//       token: process.env.SLACK_ACCESS_TOKEN,
//       trigger_id,
//       view: JSON.stringify({
//         type: 'modal',
//         title: {
//           type: 'plain_text',
//           text: 'Submit a helpdesk ticket'
//         },
//         callback_id: 'submit-ticket',
//         submit: {
//           type: 'plain_text',
//           text: 'Submit'
//         },
//         blocks: [
//           {
//             block_id: 'title_block',
//             type: 'input',
//             label: {
//               type: 'plain_text',
//               text: 'Title'
//             },
//             element: {
//               action_id: 'title',
//               type: 'plain_text_input'
//             },
//             hint: {
//               type: 'plain_text',
//               text: '30 second summary of the problem'
//             }
//           },
//           {
//             block_id: 'description_block',
//             type: 'input',
//             label: {
//               type: 'plain_text',
//               text: 'Description'
//             },
//             element: {
//               action_id: 'description',
//               type: 'plain_text_input',
//               multiline: true
//             },
//             optional: true
//           },
//           {
//             block_id: 'urgency_block',
//             type: 'input',
//             label: {
//               type: 'plain_text',
//               text: 'Importance'
//             },
//             element: {
//               action_id: 'urgency',
//               type: 'static_select',
//               options: [
//                 {
//                   text: {
//                     type: "plain_text",
//                     text: "High"
//                   },
//                   value: "high"
//                 },
//                 {
//                   text: {
//                     type: "plain_text",
//                     text: "Medium"
//                   },
//                   value: "medium"
//                 },
//                 {
//                   text: {
//                     type: "plain_text",
//                     text: "Low"
//                   },
//                   value: "low"
//                 }
//               ]
//             },
//             optional: true
//           }
//         ]
//       })
//     };

//     console.log('open view')

//     // open the dialog by calling dialogs.open method and sending the payload
//     axios.post(`${apiUrl}/views.open`, qs.stringify(view))
//       .then((result) => {
//         debug('views.open: %o', result.data);
//         res.send('');
//       }).catch((err) => {
//         debug('views.open call failed: %o', err);
//         res.sendStatus(500);
//       });
//   } else {
//     debug('Verification token mismatch');
//     res.sendStatus(404);
//   }
// });

// /*
//  * Endpoint to receive the modal submission. Checks the verification token
//  * and creates a Helpdesk ticket
//  */
// app.post('/interactive', (req, res) => {
//   const body = JSON.parse(req.body.payload);

//   // check that the verification token matches expected value
//   if (signature.isVerified(req)) {
//     debug(`Form submission received: ${body.view}`);

//     // immediately respond with a empty 200 response to let
//     // Slack know the command was received
//     res.send('');

//     // create Helpdesk ticket
//     ticket.create(body.user.id, body.view);
//   } else {
//     debug('Token mismatch');
//     res.sendStatus(404);
//   }
// });

// const server = app.listen(process.env.PORT || 5000, () => {
//   console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
// });


// app.post('/command', (req, res) => {
//     const { text, trigger_id } = req.body;
//   const symbol = text;
//   const result = await Axios.get(
//     `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.API_KEY}`
//   );
//   const lastRefreshed = result.data["Meta Data"]["3. Last Refreshed"];
//   const lastClose =
//     result.data["Time Series (Daily)"][lastRefreshed]["4. close"];

//   await Axios.post(
//     `https://hooks.slack.com/services/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`,
    // {
    //   blocks: [
    //     {
    //       type: "section",
    //       text: {
    //         type: "mrkdwn",
    //         text: `Alert! Alert! *${symbol}* is now $${lastClose}. <https://www.google.com/search?q=NYSE:+${symbol}|View on Google Finance>`,
    //       },
    //     },
    //   ],
    // }
//   );

//   res.json({
//     lastClose,
//     date: new Date().toISOString(),
//   });
// });




// const app = new App({
//   token: process.env.SLACK_ACCESS_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   // LogLevel can be imported and used to make debugging simpler
//   logLevel: LogLevel.DEBUG
// });

// app.shortcut('stockcheck', async ({ ack, payload, client }) => {
//   // Acknowledge shortcut request
//   ack();

//   try {
//     // Call the views.open method using the built-in WebClient
//     // The client uses the token you used to initialize the app
//     const result = await app.client.views.open({
//       trigger_id: payload.trigger_id,
//       view: {
//         blocks: [
//           {
//             type: "section",
//             text: {
//               type: "mrkdwn",
//               text: `Alert! Alert! *${symbol}* is now $${lastClose}. <https://www.google.com/search?q=NYSE:+${symbol}|View on Google Finance>`,
//             },
//           },
//         ],
//       }
//     });

//     console.log(result);
//   }
//   catch (error) {
//     console.error(error);
//   }
// });