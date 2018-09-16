// Success
const pResolved = Promise.resolve({ id: 1, name: 'jao' });
pResolved.then(res => console.log(res));

// Fail
const pRejected = Promise.reject(new Error('Deu ruim'));
pRejected.catch(err => console.log(err.message));