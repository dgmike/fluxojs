module.exports = {
  user: {
    valid: async (username, password) => {
      return username === 'michael' && password === '1234';
    }
  }
}
