import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './model/bot.model';
import { Ctx, InjectBot, On } from 'nestjs-telegraf';
import { BOT_NAME } from 'add.constanta';
import { Context, Markup, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  constructor(@InjectModel(Bot) private botRepo:typeof Bot,
@InjectBot(BOT_NAME) private readonly bot:Telegraf<Context>
){}
  

async start(@Ctx() ctx:Context){
await ctx.reply(`Assalomu alaukum ${ctx.from.first_name}.Ro'xatdan o'tish uchun pastdagi tugmalardan birini tanlang !`,
{
  parse_mode:'HTML',
  ...Markup.keyboard(
      [
        ["👷worker",
        '👨‍💼owner',
        '👨‍🦱client'],
      ['ℹ️Info',
      '📲contact us','📍our address'],
   ]
  ).resize()
      })

}

async worker(ctx:Context){
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
  }else if(!user.status){
      await ctx.reply(
        `Iltimos, <b> "telefon raqamini yuborish"</b> tugmasini bosing!`,
        {
          parse_mode:'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('📞Telefon raqamni yuboring')]
          ]).oneTime().resize()
        })
  }else{
    await ctx.reply(
      `Bu bot orqali moyka servicedan royxatdan otasiz`,
      {
        parse_mode:'HTML',
        ...Markup.removeKeyboard()
      }
      )
  }
}


  async onContact(ctx:Context){
    if("contact" in ctx.message){
  const userId = ctx.from.id
  const user = await this.botRepo.findOne({where:{user_id:userId}})
  if(!user){
    await ctx.reply(
      `Iltimos, <b> "/start"</b> tugmasini bosing!`,
      {
        parse_mode:'HTML',
        ...Markup.keyboard([
          ["/start"]
        ]).oneTime().resize()
      })
  }else if(ctx.message.contact.user_id !== userId){
      await ctx.reply(
        ` <b>O'zingizni telefon raqamingizni yuborin</b>!`,
        {
          parse_mode:'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('📞Telefon raqamni yuboring')]]).oneTime().resize()
        })
  }else{
    await this.botRepo.update(
      {
        phone_number:ctx.message.contact.phone_number,
        status:true,
      },
      {where:{user_id:userId}}
    ),
    await ctx.reply(`Tabriklayman ro'xatdan o'tdingiz !`,{
      parse_mode:"HTML",
      ...Markup.removeKeyboard()
    })
    
  }
}
  }  
  

  async onStop(ctx:Context){
    const userId = ctx.from.id
    const user = await this.botRepo.findOne({where:{user_id:userId}})
  
  if(!user){
    await ctx.reply(
      `Siz avval ro'xatdan o'tmagansiz <b> "/start"</b> tugmasini bosing!`,
      {
        parse_mode:'HTML',
        ...Markup.keyboard([
          ["/start"]
        ]).oneTime().resize()
      })
    }else{
      await this.botRepo.update({status:false,phone_number:null},{where:{user_id:userId}})
      await ctx.reply(`Siz botdan chiqdingiz.Qayta foydalanish uchun <b> "/start"</b> tugmasini bosing!`,
      {
        parse_mode:'HTML',
        ...Markup.keyboard([
          ["/start"]
        ]).oneTime().resize()
      })
    }
  }
}
