import emojis from '../../emojis.json'
import { Command } from '../../modules/handler'
import config from '../../config.json'
import { MessageEmbed } from 'discord.js'


class Kick extends Command{
    name = 'kick'

    execute(){
        if(!this.msg.member?.roles.cache.has(config.bot.guilds.main.staffroleid.mod) && !this.msg.member?.hasPermission('ADMINISTRATOR'))
            return this.msg.react(emojis.error.id)
        const user = this.msg.mentions.users.first() || this.msg.guild?.members.cache.get(this.args[0])
        if(!user)
            return this.msg.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTitle(emojis.error + ' | Não encontrei o membro.')
            )
        const reason = this.args.slice(1).join(' ') || 'Sem motivo informado.'
        const member = this.msg.guild?.member(user)

        if(member)
            member.kick(reason)
                .catch(console.log)
                .then(() => this.msg.react(emojis.ok.id))
    }
}

export default new Kick()