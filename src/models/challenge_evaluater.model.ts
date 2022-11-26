import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../utils/dbconnection.util';
import { constents } from '../configs/constents.config';


export class challenge_evaluater extends Model<InferAttributes<challenge_evaluater>, InferCreationAttributes<challenge_evaluater>> {
    
    declare challenge_evaluater_id: CreationOptional<number>;
    declare challenge_id: number;
    declare eval_user_id: number;
    // declare badge_no: number;
    declare level: string;
    declare status: CreationOptional<Enumerator>;
    declare created_by: CreationOptional<number>;
    declare created_at: CreationOptional<Date>;
    declare updated_by: CreationOptional<number>;
    declare updated_at: CreationOptional<Date>;
    
    static modelTableName = "challenge_evaluaters";
    static structrue:any =  {
        challenge_evaluater_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        challenge_id:{
            type: DataTypes.INTEGER,
            references: 'challenges', // <<< Note, its table's name, not object name
            referencesKey: 'challenge_id'
        },
        eval_user_id:{
            type: DataTypes.INTEGER,
            references: 'users', // <<< Note, its table's name, not object name
            referencesKey: 'user_id'
        },
        level: {
            type: DataTypes.STRING,
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

challenge_evaluater.init(
    challenge_evaluater.structrue,
    {
        sequelize: db,
        tableName: challenge_evaluater.modelTableName,
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