import axios from 'axios';

const express = require('express');
const axios = require('axios');
const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic');

const app = express();
const PORT = process.env.PORT || 9876;

const WINDOW_SIZE = 10;
let numbers = [];

// Function to fetch numbers from the third-party server
const fetchNumbers = async () => {
  const url = 'http://20.244.56.144/test/p'; // Example URL, replace with the actual endpoint
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTUwMDgwLCJpYXQiOjE3MTUxNDk3ODAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg4OTFhMjNhLTk5YjMtNDJlNS1hZDlmLTNkZjM2YmFlZDE3ZSIsInN1YiI6IjIxMDUwMTVAa2lpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IkFmZm9yZCIsImNsaWVudElEIjoiODg5MWEyM2EtOTliMy00MmU1LWFkOWYtM2RmMzZiYWVkMTdlIiwiY2xpZW50U2VjcmV0IjoiY1BKaWxqaVRsWk96VVBJVSIsIm93bmVyTmFtZSI6IkFudXJhZyBTaW5naCIsIm93bmVyRW1haWwiOiIyMTA1MDE1QGtpaXQuYWMuaW4iLCJyb2xsTm8iOiIyMTA1MDE1In0.ewsqXiV0LaDFBalGNxWAeFCzAlrat_OHrg68ctCDFgU'; // Example JWT token
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: Bearer ${token}
      }
    });
    return response.data.numbers || [];
  } catch (error) {
    console.error(Error fetching numbers from the third-party server: ${error.message});
    throw error; // Rethrow the error to retry the request
  }
};

// Function to calculate average
const calculateAverage = (nums) => {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
};

// Fetch numbers and update state periodically
const updateNumbers = async () => {
  try {
    const newNumbers = await fetchNumbers();
    if (newNumbers.length > 0) {
      // Update numbers with new fetched numbers
      numbers = numbers.concat(newNumbers).filter((num, index, arr) => arr.indexOf(num) === index).slice(-WINDOW_SIZE);
    }
  } catch (error) {
    // Log the error
    console.error(Error fetching numbers from the third-party server: ${error.message});
  }
};

// Periodically update numbers every 500 ms
const interval = setIntervalAsync(updateNumbers, 500);

// Handle incoming requests
app.get('/numbers/:numberid', async (req, res) => {
  // Calculate average
  const avg = calculateAverage(numbers);

  // Prepare response data
  const responseData = {
    windowPrevState: numbers.slice(0, -1),
    windowCurrState: numbers,
    numbers,
    avg: avg.toFixed(2)
  };
\
  res.json(responseData);
});

// Start the server
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});


