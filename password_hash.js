const bcrypt = require('bcrypt')

const encrypt = (password) => {
  return bcrypt.hash(password, 10)
}
encrypt('thickdad').then(data => console.log(data))
