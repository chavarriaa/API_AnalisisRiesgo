module.exports = class handlers{
    static error =(data)=>({
        type:'error',
        status:data.status,
        message: JSON.stringify(data.message)
    })   
}