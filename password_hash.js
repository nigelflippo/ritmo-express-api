const bcrypt = require('bcrypt')

const encrypt = (password) => {
  return bcrypt.hash(password, 10)
}
encrypt('ruby').then(data => console.log(data))
