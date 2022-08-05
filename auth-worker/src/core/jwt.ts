import jwt from "jsonwebtoken"

export default (options: any) => {
    //const {user, password, token} = options

    // console.log(`GraphQL server is ${options} running on port ${jwt.sign({ foo: 'bar' }, 'shhhhh')}.`)

    return `GraphQL server is ${options} running on port ${jwt.sign({ foo: 'bar' }, 'shhhhh')}.`
}