const config = require('dotenv').config();
const axios = require('axios');
const fetch = require('node-fetch');
const Discord = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(process.env.WEATHER_TOKEN);
});
client.on('messageCreate', async msg => {
    if(msg.content.includes("!weather")){
      let zipCode = msg.content.split(" ")[1];
      if(zipCode === undefined || zipCode.length != 5 || parseInt(zipCode)===NaN){
        msg.channel.send("Invalid ZipCode! Follow the format: !weather XXXXX").catch(console.error)
        return;
      }else{
        fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&appid=' + process.env.WEATHER_TOKEN)
        .then(response => response.json()).then(data => console.log(data));
      }
    }
})






  


client.login(process.env.CLIENT_TOKEN);
//testing


