import { Migration } from '../umzug';
import { DataTypes } from 'sequelize';
import { challenge_evaluater } from '../../../models/challenge_evaluater.model';
import { constents } from '../../../configs/constents.config';
import { user } from '../../../models/user.model';
import { challenge } from '../../../models/challenge.model';

// you can put some table-specific imports/code here
export const tableName = challenge_evaluater.modelTableName;
export const structure = {
	challenge_evaluater_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	challenge_id:{
		type: DataTypes.INTEGER,
		// refrences:{
		// 	model:challenge,
		// 	key:"challenge_id"
		// },
		references:{
			model:"challenges",
			key:"challenge_id"
		},
		allowNull:false
	},
	eval_user_id:{
		type: DataTypes.INTEGER,
		// refrences:{
		// 	model:user,
		// 	key:"user_id"
		// },
		references:{
			model:"users",
			key:"user_id"
		},
		allowNull:false
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
export const up: Migration = async ({ context: sequelize }) => {
	// await sequelize.query(`raise fail('up migration not implemented')`); //call direct sql 
	//or below implementation 
	
	await sequelize.getQueryInterface().createTable(tableName, structure);
};

export const down: Migration = async ({ context: sequelize }) => {
	// 	await sequelize.query(`raise fail('down migration not implemented')`); //call direct sql 
	//or below implementation 
	// await sequelize.getQueryInterface().dropTable(tableName);
	try {
		await sequelize.transaction(async (transaction) => {
		  const options = { transaction };
		  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", options);
		  await sequelize.query(`DROP TABLE ${tableName}`, options);
		  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", options);
		});
} catch (error) {
	throw error	  
}
};