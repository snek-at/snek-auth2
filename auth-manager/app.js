import getServerlessApp from '@snek-at/functions/dist/server/getServerlessApp.js'

export async function handler(event, context) {
  const { spawn } = await import("child_process")
  spawn('python', ['-m','django_prototype.proxy_handler'])

  //await new Promise(r => setTimeout(r, 5000))

  const app = await getServerlessApp({
    functions: '.'
  })(event, context)

  return app
}
