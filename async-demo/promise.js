const p = new Promise((resolve, reject) => {
  const payload = {
    name: "Jão"
  };
  setTimeout(function() {
    resolve(payload);

    reject(new Error('Mensagem de erro'));
  }, 1000);

  // error
});

p.then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});
