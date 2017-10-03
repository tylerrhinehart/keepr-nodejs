// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'development',
	PORT: process.env.PORT || 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'admin',
	DBPASSWORD: 'admin',
	DBHOST: 'ds161194.mlab.com:61194',
	DBNAME: 'keepr-nodejs',
	SERVERNAME: 'dev-server'
}

// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
}) 


// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env