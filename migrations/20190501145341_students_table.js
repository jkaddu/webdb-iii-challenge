exports.up = function(knex, Promise) {
	return knex.schema.createTable('students', (tbl) => {
		tbl.increments();
		tbl.string('name', 120).notNullable();

		// foreign key
		tbl.integer('cohort_id').unsigned().reference('id').inTable('cohorts').onDelete('CASCADE').onUpdate('CASCADE');

		tbl.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExist('students');
};
