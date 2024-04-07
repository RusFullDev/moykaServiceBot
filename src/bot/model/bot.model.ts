import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

interface ICreationBotAttr{
    user_id:number
    username:string
    first_name:string
    last_name:string
    phone_number:string
    status:boolean
}

@Table({tableName:"bot"})
export class Bot extends Model<Bot,ICreationBotAttr>{
    @Column({
        type:DataType.BIGINT,primaryKey:true
    }) 
    user_id:number

    @Column({
        type:DataType.STRING
    }) 
    username:string

    @Column({
        type:DataType.STRING
    }) 
    first_name:string

    @Column({
        type:DataType.STRING
    })
    last_name:string
    @Column({
        type:DataType.STRING
    })
    phone_number:string

    @Column({
        type:DataType.BOOLEAN,defaultValue:false
    })
    status:boolean

}
