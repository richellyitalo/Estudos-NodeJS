console.log("Antes");

// getUser(33, user => {
//   // console.log("Usuário: ", user);
//   getRepos(user.name, repos => {
//     getCommits(repos[0], displayCommits);
//   });
// });

// Via Promise
// getUser(1)
//   .then(user => getRepos(user.name))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log("Commits", commits))
//   .catch(err => {
//     console.log(err.message);
//   });

// Via Asyn/Await
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepos(user.name);
    const commits = await getCommits(repos[0]);
    console.log(commits[0]);
  } catch (err) {
    console.log("Deu ruim: ", err.message);
  }
}

displayCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting User...");

      resolve({ id: id, name: "Nome do usuário" });
    }, 1000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting Repos...");
      // reject(new Error('Não encontrou repo'));
      resolve(["repo 1", "repo 2", "repo 3"]);
    }, 1000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    console.log("Getting commits");
    setTimeout(() => {
      resolve(["commit #a", "commit #b"]);
    }, 1000);
  });
}

console.log("Depois");
