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
		.then((cohort) => {
			res.status(200).json(cohort);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.first()
		.then((cohort) => {
			if (cohort) {
				res.status(200).json(cohort);
			} else {
				res.status(404).json({ message: 'Cohort not found.' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST ZOO animal
router.post('/', (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ message: 'Please provide a name.' });
	} else {
		db('cohorts')
			.insert(req.body, 'id')
			.then((ids) => {
				db('cohorts').where({ id: ids[0] }).first().then((cohort) => {
					res.status(200).json(cohort);
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
});

// Update
router.put('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.update(req.body)
		.then((id) => {
			if (id === id) {
				res.status(200).json({ message: 'Record updated.' });
			} else {
				res.status(404).json({ message: 'Cohort ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// Delete
router.delete('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.delete()
		.then((id) => {
			if (id === id) {
				res.status(200).json({ message: 'Record deleted.' });
			} else {
				res.status(404).json({ message: 'Cohort ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
