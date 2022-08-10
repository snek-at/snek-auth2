import {fn} from './factory'
import {authenticate as auth} from './internal/index.js'

const authenticate = fn<{username: string; password: string}, boolean>(
  async (args, _, req) => {

    const res = await auth({user: args.username, password: args.password, token: ""})

    console.log(res)

    return res
    
  },
  {
    name: 'authenticate'
  }
)

export default authenticate
