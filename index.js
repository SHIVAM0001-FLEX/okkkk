require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client, MessageEmbed } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX,
  SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

client.on("message", async (message) => {
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
            const HELLO_SERVER = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`About ${client.user.username}`)
            .setThumbnail(client.user.avatarURL())
            .setDescription(`My Prefix Here Is: \`${process.env.PREFIX}\`\nMy Devloper: **THE丶JUИGLΣΣ丶SHIVAMᵀˣ** \n \n You can play music by joining a voice channel and typing \`${process.env.PREFIX}play\`. Type \`${process.env.PREFIX}help\` To Get All Commands Help Menu.\n \n [Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support](https://discord.gg/Arqg9kc8r5)`)
            .setTimestamp();
            return message.channel.send(HELLO_SERVER);
        }
})


client.on('ready', async() => {
		const status = {
			ONLINE: "**Online** <a:online:839478653288185936>",
			OFFLINE: "**Offline** <a:offline:839478659319595018>",
			IDLE: "**Idle** <a:idle:839493674495639552>",
			DND: "**DND** <a:dnd:839478656324862042>"		
		}

		const my = status[client.users.cache.get('764546128204005436').presence.status.toUpperCase()]
		const yogi = status[client.users.cache.get('716290028829147198').presence.status.toUpperCase()]
		const opf = status[client.users.cache.get('822294569223454740').presence.status.toUpperCase()]
		const opmf = status[client.users.cache.get('825244753377099776').presence.status.toUpperCase()]
		const opm3f = status[client.users.cache.get('825245034449993748').presence.status.toUpperCase()]

		const livestatuschannel = "839478582032203816";
		const channel = client.channels.cache.get(livestatuschannel)

		const embed = new MessageEmbed()
		.setTitle('Cloudz Music Status')
		.addField('`Cloudz Music 1`', opf, true)
		.addField('`Cloudz Music 2`', opmf, true)
		.addField('`Cloudz Music 3`', opm3f, true)
		.addField('`THE丶JUИGLΣΣ丶SHIVAMᵀˣ#5290 (Developer)`', my, true)
		.addField('`𝐙𝐆𝐎𝐃#7663 (Developer)`', yogi, true)
		.setColor("#FF0000")
		.setTimestamp()
    		.setThumbnail(client.user.avatarURL())
		.setFooter(`Powered BY Cloudz Music Music`, client.user.avatarURL());		
		channel.bulkDelete(10);
		channel.send(embed).then((msg) => {
			setInterval(() =>{
				const my = status[client.users.cache.get('764546128204005436').presence.status.toUpperCase()]
				const yogi = status[client.users.cache.get('716290028829147198').presence.status.toUpperCase()]
				const opf = status[client.users.cache.get('822294569223454740').presence.status.toUpperCase()]
				const opmf = status[client.users.cache.get('825244753377099776').presence.status.toUpperCase()]
				const opm3f = status[client.users.cache.get('825245034449993748').presence.status.toUpperCase()]
				const rembed = new MessageEmbed()
		                .setTitle('Cloudz Music Status')
                		.addField('`Cloudz Music 1`', opf, true)
                		.addField('`Cloudz Music 2`', opmf, true)
                		.addField('`Cloudz Music 3`', opm3f, true)
                		.addField('`LH ⊱ Glitch (Developer)`', my, true)
				.addField('`Mr. Yogi (Developer)`', yogi, true)
                		.setColor("#FF0000")
                		.setTimestamp()
                    		.setThumbnail(client.user.avatarURL())
                		.setFooter(`Powered BY Cloudz Music Music`, client.user.avatarURL());		
				msg.edit(rembed);
			}, 60000);})		
});


//Logging in to discord
client.login(process.env.TOKEN)
