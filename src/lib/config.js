
module.exports = {
    'user':process.env.user,
    'password':process.env.password,
    'server':process.env.server,
    'database':process.env.database,
    'options': {
        encrypt:false,
        trustServerCertificate: true
      }  
  };