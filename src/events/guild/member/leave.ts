import zuraaa from '../../../'
import {GuildMember, MessageEmbed, TextChannel} from 'discord.js'
import modlogs from '../../../modules/utils/bot/modlogs'
import config from '../../../../config.json'
import ZuraaaApi from '../../../modules/api/zuraaaapi'

zuraaa.client.on('guildMemberRemove', member => {
    if(member.guild.id != config.bot.guilds.main.id)
        return
    const completeMember = member as GuildMember
    modlogs(completeMember.guild)
    sendMemberLog(completeMember)
    removeBots(completeMember)
})

function removeBots(member: GuildMember){
    const api = new ZuraaaApi()

    api.getUserBots(member.id).then(userBot => {
        for(const bot of userBot){
            if([bot.owner, ...bot.details.otherOwners].some(member.guild.fetch))
                member.guild.members.cache.get(bot._id)?.kick('Todos os donos sairam.')
        }

    }).catch(console.warn)
    
    
}

function sendMemberLog(member: GuildMember){
    const channel = member.guild.channels.cache.get(config.bot.guilds.main.channels.wellcome) as TextChannel
    channel.send(new MessageEmbed()
    .setColor('#f20c23')
    .setTimestamp(new Date())
    .setTitle(`**${member.user.username} #${member.user.discriminator}**`)
    .setFooter('ID: ' + member.id)
    .setThumbnail(member.user.displayAvatarURL({
        dynamic: true
    }))
    .addFields([
        {
            name: 'Membros:',
            value: '`#' + member.guild.memberCount + '`',
            inline: true
        },
        {
            name: 'Bot:',
            value: (member.user.bot) ? 'Sim' : 'Não',
            inline: true
        }
    ]))
}