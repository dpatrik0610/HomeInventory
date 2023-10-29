async function connectWithRetry(database, maxRetries = 5, retryDelay = 10000) {
    let retries = 0;
  
    while (retries < maxRetries) {
      try {
        await database.connect();
        break;
      } catch (error) {
        retries++;
        if (retries < maxRetries) {
          console.log(`Retrying in ${retryDelay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        } else {
          console.error('Max connection retries reached. Exiting.');
          process.exit(1);
        }
      }
    }
  }
  
  module.exports = { connectWithRetry };
  