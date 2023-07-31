import pkg from 'pg';

const {Pool}=pkg;

const pool= new Pool();


pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
    } else {
    //   console.log('queryResult:', result.rows);
    }
  });

  export default pool;