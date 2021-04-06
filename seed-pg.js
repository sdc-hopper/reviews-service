const { Pool, Client } = require('pg')
const client = new Client();
const { createTable } = require('./pg-schema.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// });

const seed = async () => {
  await createTable(pool);
  const fileCount = 60;
  console.log('starting copy...');
  try {
    for (let i = 0; i < fileCount; i++) {
      let count = await pool.query(`
      COPY reviews
      FROM 'D://data${i}.csv' WITH DELIMITER ',' CSV HEADER;
    `);
    console.log('Count' , count);
    console.log('Batch Done: ' , i);
    }
  } catch(err) {
    console.log(err);
  }
  pool.end();
};


seed();

// const seed = async () => {
//   await client.connect()
//   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
//   console.log(res.rows[0].message) // Hello world!
//   await client.end()
// }




