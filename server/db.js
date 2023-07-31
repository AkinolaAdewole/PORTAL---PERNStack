import pkg from 'pg';
const {Pool}=pkg;
 
const poolQuery = new Pool();

const executeQuery = async (text, params) => {
  try {
    // Use the poolQuery object to execute the query with the provided text and params
    const result = await poolQuery.query(text, params);

    // Log the query result to the console (you may comment this line for production)
    console.log('Query result:', result.rows);

    // Return the result object which includes the rows returned by the query and other metadata
    return result;
  } catch (error) {
    // If there is an error executing the query, log the error to the console
    console.error('Error executing the query:', error);

    // Re-throw the error to the calling function for further handling
    throw error;
  }
};

export default executeQuery;
