let fs = require('fs');

const readFiles = () => {
  let subscribersP = new Promise( (resolve, reject) => {
    fs.readFile('./subscribers.txt', 'utf8', (error, subscribers) => {
      resolve(subscribers);
      reject(error);
    })
  })

  let bouncedP = new Promise( (resolve, reject) => {
    fs.readFile('./bounced.txt', 'utf8', (error, bounced) => {
      resolve(bounced)
      reject(error);
    })
  })

  let unsubscribedP = new Promise( (resolve, reject) => {
    fs.readFile('./unsubscribed.txt', 'utf8', (error, unsubscribed) => {
      resolve(unsubscribed)
      reject(error);
    })
  })

  return Promise.all([subscribersP, bouncedP, unsubscribedP])
}

const editFiles = (content) => {
  let subscribers = content[0].split('\n');
  let bounced = content[1].split('\n');
  let unsubscribed = content[2].split('\n');

  let filteredSubscribers = subscribers.filter( email => {
    return !bounced.includes(email) && !unsubscribed.includes(email);
  })

  fs.writeFile('./filteredSubscribers.txt', filteredSubscribers.join('\n'), (error) => {
    error ? console.log(error) : console.log('very big success!');
  })
}

readFiles()
  .then(contentArr => editFiles(contentArr))
  .catch(err => console.log(err));
