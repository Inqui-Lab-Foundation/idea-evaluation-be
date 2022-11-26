import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../utils/dbconnection.util';
import { constents } from '../configs/constents.config';
import { challenge } from './challenge.model';
import { user } from './user.model';


export class challenge_evaluation_response extends Model<InferAttributes<challenge_evaluation_response>, InferCreationAttributes<challenge_evaluation_response>> {
    
    declare challenge_evaluation_response_id: CreationOptional<number>;
    declare challenge_id: number;
    declare eval_user_id: number;
    // declare badge_no: number;
    declare level: string;
    declare responses: string;
    declare score: number;
    declare status: CreationOptional<Enumerator>;
    declare created_by: CreationOptional<number>;
    declare created_at: CreationOptional<Date>;
    declare updated_by: CreationOptional<number>;
    declare updated_at: CreationOptional<Date>;
    
    static modelTableName = "challenge_evaluation_responses";
    static structrue:any =  {
        challenge_evaluation_response_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        challenge_id:{
            type: DataTypes.INTEGER,
            refrences:{
                model:challenge,
                key:"challenge_id"
            },
        },
        eval_user_id:{
            type: DataTypes.INTEGER,
            refrences:{
                model:user,
                key:"user_id"
            },
        },
        level: {
            type: DataTypes.STRING,
        },
        responses: {
            type: DataTypes.TEXT("long"),
        },
        score: {
            type: DataTypes.INTEGER,
        },
        is_accepted: {
            type: DataTypes.ENUM(...Object.values(constents.evaluation_flags.list)),
            defaultValue: constents.evaluation_flags.default
        },
        status: {
            type: DataTypes.ENUM(...Object.values(constents.common_status_flags.list)),
            defaultValue: constents.common_status_flags.default
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            onUpdate: new Date().toLocaleString()
        }
    };
    

}

challenge_evaluation_response.init(
    challenge_evaluation_response.structrue,
    {
        sequelize: db,
        tableName: challenge_evaluation_response.modelTableName,
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        hooks: {
            // beforeCreate: async (argBadge:any) => {
                // if (argBadge.name) {
                //     argBadge.slug = badge.getSlugValue(argBadge.name);
                // }
            // },
            // beforeUpdate: async (user) => {
            //     if (user.password) {
            //         user.password = await bcrypt.hashSync(user.password, process.env.SALT || baseConfig.SALT);
            //     }
            // }
        }
    }
);