const Pool =require("pg").Pool

const pool= new Pool();

// module.exports ={ query : (text, params) => pool.query(text, params)};

pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
    } else {
      console.log('Query result:', result.rows);
    }
  });

  module.exports= pool