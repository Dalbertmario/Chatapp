export default function DateTime(params){
    return Intl.DateTimeFormat('en',{
       day:'numeric',
       month:'numeric',
       year:'numeric'
    }).format(new Date(params))
}