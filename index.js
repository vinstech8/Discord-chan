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

client.on("guildCreate", guild => { // Joined Guild 
    console.log(`Discord-chan has joined ${guild.name}. ID: ${guild.id}`);
});

client.on("guildDelete", guild => { // Left Guild
    console.log(`Discord-chan has left ${guild.name}. ID: ${guild.id}`);
});

client.on("message", () => { // Message Sent
    // Blank for now
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["basic", "Basic commands"],
        ["management", "Management commands"],
        ["owner", "Owner-only commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(`${__dirname}/commands`);

client.login(config.token);
