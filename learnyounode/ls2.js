import ls_module from "./ls-module";

ls_module(process.argv[2], process.argv[3], (err, files) => {
  if (err) throw err
  files.forEach((f) => { console.log(f) })
})
