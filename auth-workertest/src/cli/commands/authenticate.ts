import { jwt } from "../../internal/index.js"
import { storage } from "../../internal/index.js"

export default async (options: any) => {
  storage.queryDatabaseWithIterator()

  if(options.user === "cisco" && options.password === "ciscocisco"){
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
  }else{
    console.log("nope")
  }

  console.log(`options: \n${JSON.stringify(options)}\n`)
}
