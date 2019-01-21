if(process.env.NODE_ENV === 'production') {
	module.exports = {
  	database: 'mongodb://forward:forward19@ds163014.mlab.com:63014/forward-prod'
	}
} else {
	module.exports = {
  	database: 'mongodb://localhost/forward'
	}
}
