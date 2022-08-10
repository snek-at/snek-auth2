import {fn} from './factory'

const login = fn<{username: string; password: string}, boolean>(
  async (args, _, req) => {

    // proxyTo(url)
    const url = "https://access.snek.at/"

    const res = await fetch(url, {
      method: 'POST',
      headers: req.headers,
      body: req.body
    })

    console.log(res)

    return res
    
  },
  {
    name: 'login'
  }
)

export default login
