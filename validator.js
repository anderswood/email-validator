const fs = require('fs');

const readFiles = () => {
  const subscribersP = new Promise( (resolve, reject) => {
    fs.readFile('./subscribers.txt', 'utf8', (error, subscribers) => {
      resolve(subscribers);
      reject(error);
    })
  })

  const bouncedP = new Promise( (resolve, reject) => {
    fs.readFile('./bounced.txt', 'utf8', (error, bounced) => {
      resolve(bounced)
      reject(error);
    })
  })

  const unsubscribedP = new Promise( (resolve, reject) => {
    fs.readFile('./unsubscribed.txt', 'utf8', (error, unsubscribed) => {
      resolve(unsubscribed)
      reject(error);
    })
  })

  return Promise.all([subscribersP, bouncedP, unsubscribedP])
}

const editFiles = (content) => {
  const subscribers = content[0].split('\n');
  const bounced = content[1].split('\n').map( email => email.toUpperCase());
  const unsubscribed = content[2].split('\n').map( email => email.toUpperCase());

  const filteredSubscribers = subscribers.filter( email => {
    return !bounced.includes(email.toUpperCase())
      && !unsubscribed.includes(email.toUpperCase());
  })

  fs.writeFile('./filteredSubscribers.txt', filteredSubscribers.join('\n'), (error) => {
    error ? console.log(error) : console.log('very big success!');
  })
}

readFiles()
  .then(contentArr => editFiles(contentArr))
  .catch(err => console.log(err));
