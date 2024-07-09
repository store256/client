
export const storeUser =(res)=>{
    localStorage.setItem('user', JSON.stringify({
        username:res.user.username,
        email:res.user.email,
        jwt:res.jwt
    }))
}


export const userData =()=>{
    const user =localStorage.getItem('user') || '""'
    return JSON.parse(user) || {}
}

