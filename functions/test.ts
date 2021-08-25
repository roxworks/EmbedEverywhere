// import fetch from 'node-fetch';

import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };

/* const response = await fetch('https://example.com');

// Returns an array of values, instead of a string of comma-separated values
console.log(response.headers.raw()['set-cookie']); */
