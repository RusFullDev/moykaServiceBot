import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from 'add.constanta';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './bot/model/bot.model';
import { AvtoModule } from './avto/avto.module';


@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), BotModule,
    TelegrafModule.forRootAsync({
      botName:BOT_NAME,
      useFactory:()=>({
token:process.env.API_TOKEN,
middlewares:[],
include:[BotModule]
      })
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    models:[Bot],
  autoLoadModels:true,
sync:{alter:true},
logging:false
}),
      BotModule,
      AvtoModule,


  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
