const commando = require("discord.js-commando");
const config = require("./config.json");
const client = new commando.Client({
    owner: config.ownerid,
    commandPrefix: config.prefix
});

client.on("ready", () => { // Startup
    console.log(`Discord-chan is online on ${client.guilds.size} guilds.`);
    client.user.setActivity("with Vin's code | d!");
});

client.on("guildCreate", guild => { // Join a Guild 
    console.log(`Discord-chan has joined ${guild.name}. ID: ${guild.id}`);
});

client.on("guildDelete", guild => { // Leave a Guild
    console.log(`Discord-chan has left ${guild.name}. ID: ${guild.id}`);
});

client.on("message", () => { // Message sent
    // Blank for now
});

client.registry
    .registerCommandsIn(`${__dirname}/commands`)
    .registerDefaults()
    .registerGroups([
        ["basic", "Basic commands"],
        ["management", "Management commands"]
    ]);

client.login(config.token);