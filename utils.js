const tryCatchWrapper = (cb) => async (req,res,next) => {
  try {
    await cb(req,res)
  } catch(err) {
    console.log(err.message)

    if( err.name === 'ValidationError' ){
      res.status(422)
    } else {
      res.status(500)
    } 
    next(err)
  }
}

module.exports = {
  tryCatchWrapper
}