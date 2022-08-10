import { jwt } from "../../internal/index.js"

export default async (options: any) => {

  let jwtAccessToken = jwt.newAccessToken({
    user: options.user,
    durration: options.duration,
    scope: options.scope,
  })

  let jwtRefreshToken = jwt.newRefreshToken({
    accessToken: jwtAccessToken,
    durration: "30d"
  })

  let jwtRefreshedToken = jwt.refreshAccessToken({
    accessToken: jwtAccessToken,
    durration: "30d"
  })

  console.log(`jwtAccessToken: \n${jwtAccessToken}\n`)
  console.log(`jwtRefreshedToken: \n${jwtRefreshedToken}\n`)
  console.log(`jwtRefreshToken: \n${jwtRefreshToken}\n`)
  console.log(`options: \n${JSON.stringify(options)}\n`)
}
