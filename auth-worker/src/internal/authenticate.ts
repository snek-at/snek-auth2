import { jwt } from "./index.js"
import { storage } from "./index.js"

export default async (options: any) => {
  const user: any = await storage.queryDatabaseWithIterator(options.user)
  console.log(user)
  if(options.user === user.alias && options.password === user.password){
    let jwtAccessToken = jwt.newAccessToken({
      user: options.user,
      durration: "1d",
      scope: "2g",
    })
    let jwtRefreshToken = jwt.newRefreshToken({
      accessToken: jwtAccessToken,
      durration: "30d"
    })

    console.log(`jwtAccessToken: \n${jwtAccessToken}\n`)
    console.log(`jwtRefreshToken: \n${jwtRefreshToken}\n`)

    return {token: jwtAccessToken, refreshToken: jwtRefreshToken}
  }else{
    console.log("nope")
  }

  console.log(`options: \n${JSON.stringify(options)}\n`)
}
