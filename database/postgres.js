const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

const getReviews = async (productId) => {
      let result =  await pool.query(`select * from reviews where productid = '${productId}'`);
      console.log('Rows: ', result.rows);
      return result.rows;
};

// getReviews('1001')
// .then((result) => {
//   console.log(result.rows);
// })
// .catch((err) => {
//   console.log(err);
// });

module.exports = {
  getReviews
};