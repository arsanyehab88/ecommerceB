const GlobalErrorHandling=(err, req, res, next) => {
    console.log(err);
    res.status(err.StatusCode).json({message:err.message})
}

export default GlobalErrorHandling