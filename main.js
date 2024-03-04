// Task n°1 : Write an async function iterateWithAsyncAwait that takes an array of values and logs  each value with a delay of 1 second between logs. // 

const delayedLoop = async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const myAsyncFunc = async (i) => {
    console.log(`item ${i}`);
    await delay(0);
    return true;
  };

  const arr = ['one', 'two', 'three'];

  const promises = arr.map(
    (_, i) =>
      new Promise((resolve) =>
        setTimeout(async () => {
          await myAsyncFunc(i);
          resolve(true);
        }, 1000),
      ),
  );
  return Promise.all(promises);
}

const myFunc = async () => {
  console.log('START');
  await delayedLoop();
  console.log('FINISH');
}

myFunc();




// Task n°2 : Create an async function awaitCall that simulates fetching data from an API. Use await to wait for the API response and then log the data. // 

(async function () {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await response.json();
    if (json.userId == 1) {
      json.completed == false;
    } else {
      json.completed == true;
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
})();


// Task n°3-1 : Modify the awaitCall function to handle errors gracefully. If the API call fails, catch the error and log a user-friendly error message.// 


(async function () {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await response.json();
    if (json.userId == 1) {
      json.completed == false;
    } else {
      json.completed == true;
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
})();







//  Write a function chainedAsyncFunctions that calls three separate async functions sequentially. Each function should log a message after a delay //


async function getUserData() { 
  
         console.log('Data Fetched successfully');
      }
      async function cleanUserData(userData) { 
        
         console.log('Cleaning the data');
      }
      async function saveToDataBase(userData) { 
        
         console.log('Saving to DB');
      }
      async function cleanAndSaveUserData() {
         let userData = await getUserData();
         let cleanedData = await cleanUserData(userData);
         await saveToDataBase(cleanedData);
         console.log('All work done');
      }
      cleanAndSaveUserData(); // does all the work



// Task n°4 : Awaiting Concurrent Requests: Create an async function concurrentRequests that makes two API calls concurrently using Promise.all(). //


const fetchNames = async () => {
  try {
    const res = await Promise.all([
      fetch("./names.json"),
      fetch("./names-mid.json"),
      
    ]);
    const data = await Promise.all(res.map(r => r.json()))
    console.log(data.flat());
  } catch {
    throw Error("Promise failed");
  }
};


// Task n°5 : Write a function parallelCalls that takes an array of URLs and fetches data from each URL concurrently using Promise.all(). Log the responses once all requests are complete. // 


const namesonly = ['two', 'three'];
const urls = ['https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'];

Promise.all(urls.map(url => fetch(url)
  .then(response => response.json())
  .then(responseBody => responseBody.title)))
  .then(titles => {
    const names = namesonly.map(value => ({ name: value }));
    console.log('names: ' + JSON.stringify(names));
    const fakeLatins = titles.map(value => ({ loremipsum: value }));
    console.log('fakeLatins:\n' + JSON.stringify(fakeLatins));
    const result =
      names.map((item, i) => Object.assign({}, item, fakeLatins[i]));
    console.log('result:\n' + JSON.stringify(result));
  })
  .catch(err => {
    console.error('Failed to fetch one or more of these URLs:');
    console.log(urls);
    console.error(err);
  });