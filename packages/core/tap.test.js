require('.')().dag.then(({ get })=> get(process.argv[2])).then(console.log)
