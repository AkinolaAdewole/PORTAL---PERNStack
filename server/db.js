import pkg from 'pg';
const {Pool}=pkg;
const poolQuery = new Pool();

const executeQuery = async (text, params) => {
  try {
    // console.log('Executing query:', text, params);
    const result = await poolQuery.query(text, params);
    // console.log('Query result:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Error executing the query:', error);
    throw error;
  }
};

export default executeQuery;
