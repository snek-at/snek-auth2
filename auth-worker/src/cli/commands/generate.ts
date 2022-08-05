// import jwt from "../../core/jwt"
import jwt from "jsonwebtoken"

export default async (options: any) => {
    //const {user, password, token} = options
    let secret = 'shhhhh'
    
    // console.log(`GraphQL server is running on ${jwt("")} port ${JSON.stringify(options)}.`)
    console.log(`GraphQL server is ${options} running on port ${jwt.sign({
        sub: 1,
        iat: 1659728851,
        nbf: 1659728851,
        jti: "3b36868d-12e9-49ca-a40b-7fe7939d404b",
        exp: 1659729751,
        type: "access",
        fresh: false,
        is_admin: true
      }, secret)}.
    `)
  
}