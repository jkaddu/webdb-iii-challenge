const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
	client: 'sqlite3',
	connection: {
		filename: './data/lambda.db3'
	},
	useNullAsDefault: true //needed for sqlite
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
	db('cohorts')
		.then((cohorts) => {
			res.status(200).json(cohorts);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
