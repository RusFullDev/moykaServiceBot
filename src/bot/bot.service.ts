import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './model/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from 'add.constanta';
import { Context, Markup, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  constructor(@InjectModel(Bot) private botRepo:typeof Bot,
@InjectBot(BOT_NAME) private readonly bot:Telegraf<Context>
){}
  
async start(ctx:Context){
  const userId = ctx.from.id
  const user = await this.botRepo.findOne({where:{user_id:userId}})
  if(!user){
    await this.botRepo.create(
      {
        user_id:ctx.from.id,
        username:ctx.from.username,
        first_name:ctx.from.username,
        last_name:ctx.from.last_name
      })
      await ctx.reply(
        `Iltimos, <b> "telefon raqamini yuborish"</b> tugmasini bosing!`,
        {
          parse_mode:'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('📞Telefon raqamni yuboring')]
          ]).oneTime().resize()
        }
      )
  }
}
  
  
  
  
}
