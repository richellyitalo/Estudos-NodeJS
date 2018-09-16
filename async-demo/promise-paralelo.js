const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Executando #1...");
    // resolve(1);
    reject(new Error("Erro em #1"));
  }, 1500);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Executando #2...");
    resolve(2);
  }, 2000);
});

Promise.race([p1, p2])
  .then(res => console.log(res))
  .catch(err => console.log(err.message));
