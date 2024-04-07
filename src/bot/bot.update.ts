import { Action, Command, Ctx, Hears, On, Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { callback } from "telegraf/typings/button";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
    constructor(private readonly botService:BotService){}
   @Start()
   async onStart(@Ctx() ctx:Context){
   this.botService.start(ctx)
   } 
}