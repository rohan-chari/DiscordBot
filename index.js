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
        .then(response => {
          return response.json().then(parsedWeather =>{
            if(parsedWeather.cod === '404'){
              msg.channel.send("`This zip code does not exist  or there is no information available`");
            }else{
              msg.channel.send(`
              
              The current temperature in ${parsedWeather.name} is ${(Math.round(((parsedWeather.main.temp -273.15)*9/5 +32)))}° F with a feels like
              of ${(Math.round(((parsedWeather.main.feels_like -273.15)*9/5 +32)))}° F
              Today it will reach a high of ${(Math.round(((parsedWeather.main.temp_max -273.15)*9/5 +32)))}° F and a low of
              ${(Math.round(((parsedWeather.main.temp_min -273.15)*9/5 +32)))}° F. The forecast for today is ${parsedWeather.weather[0].main}.    
              `)
            }
          })
        })
      }
    }
})






  


client.login(process.env.CLIENT_TOKEN);
//testing


