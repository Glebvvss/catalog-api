const express = require('express')
const app     = express()
const routes  = require('./config/routes')
const { 
  port, 
  host, 
  staticPath
} = require('./config/app')

app.use('/', routes)
app.use(staticPath, express.static(__dirname + "/static"));
app.listen(port, () => console.log(`App listening at ${host}`))