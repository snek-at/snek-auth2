import {IAuthPayload} from "../../types"

export default async (options: IAuthPayload) => {
    const {user, password, token} = options

    console.log(`GraphQL server is running on port ${JSON.stringify(options)} ${user} ${password} ${token}.`)
}