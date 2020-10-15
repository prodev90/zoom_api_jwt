const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	development :{
		APIKey : 'Y7gvX8lXSNqmhhstApoP9g',
		APISecret : '0ecmHIOix4ANMkPRU63AMCe5B5cJakegKTBV'
	},
	production:{	
		APIKey : 'Y7gvX8lXSNqmhhstApoP9g',
		APISecret : '0ecmHIOix4ANMkPRU63AMCe5B5cJakegKTBV'
	}
};

module.exports = config[env]
