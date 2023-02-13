const mongoose = require('mongoose')

mongoose
.connect(process.env.MONGODB_ADDON_URI)
.then(() => {console.log('Succesfully connected to de databasde!')})
.catch((error) => {console.error(`Connection eneded with the following error: ${error}`)})