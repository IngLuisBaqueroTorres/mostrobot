// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const mensaje = require('./mensajes/steps.json')
const venom = require('venom-bot');
let backToMenu = false;
let step1 = true;
let step2 = false;
let step3 = false;
let sendMessage;
let wellcomeMesage="escoja una opcion: \n 1. enviar plata. \n 2. pedir plata 🕷";
venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    body = message.body.toLowerCase();
  console.log("step1: ", step1);
    if (mensaje.STEP_1.includes(body) && step1) {
      step1 = false;
      step2 = true;
      client
      .sendText(message.from, wellcomeMesage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      body= "";
    }
    else if ((mensaje.OPTION_1.includes(body) && step2) || backToMenu) {
      step2 = false;
      step3 = true;
      if (body == "1"){
        sendMessage = "ud a escogido la opcion uno cuanto desea retirar: \n 1. $ 50.000 \n 2. $ 100.000 \n 3. regresar";
      }
      if(body == "2"){
        sendMessage = "you are selected the option two";
      }
    
      body = "";
      client
      .sendText(message.from, sendMessage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
    else if (mensaje.OPTION_1.includes(body) && !step2 && step3) {
      step3 = false;
      if (body == "1"){
        sendMessage = "usd va a retirar $ 50lucas";
      }
      if(body == "2"){
        sendMessage = "usd va a retirar $ 100lucas";
      }
      if(body == "3"){
        step1 = true;
        step2 = true;
        //backToMenu = true;
        sendMessage = wellcomeMesage;       
      }
      
      client
      .sendText(message.from, sendMessage)
      .then((result) => {
        console.log('Result: ', result); //return object success
        if(body == "3"){         
        return;
        }
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        if(body == "3"){
          return;
          }
      });
      body= "";
    }



    else{
      body= "";
      step1 = true;
      step2 = true;
      step3 = false;
      console.log(mensaje.ERROR[0])
      client
      .sendText(message.from,mensaje.ERROR[0])
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });

      client
      .sendText(message.from, wellcomeMesage)
      .then((result) => {
        console.log('Result: ', result); //return object success 
        return
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        return
      });
    }
  });
}
