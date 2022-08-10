import jwt from "jsonwebtoken"
import * as crypto from "node:crypto"

interface IJWTAccessPayload {
  user: string
  scope: string
  durration?: string
}

interface IJWTRefreshPayload {
  accessToken: string
  durration?: string
}

const secret = "hiss"

export const newAccessToken = (
  payload: IJWTAccessPayload 
) => {
  let jwtId: string = crypto.randomUUID()

  let accessToken: string = jwt.sign(
    {
      scope: payload.scope,
      fresh: true,
      type: "access",
    },
    secret,
    {
      // The issuer can freely set an algorithm to verify the signature on the token. However, some supported algorithms are insecure
      // HMAC using SHA-256 hash algorithm
      algorithm: "HS256",

      // Identifies the subject of the JWT
      subject: payload.user,
      // Identifies the expiration time on and after which the JWT must not be accepted for processing. The value must be in seconds or a string describing a time span vercel/ms
      expiresIn: payload.durration,

      // Identifies principal that issued the JWT
      issuer: "snek-0",
      // Case-sensitive unique identifier of the token even among different issuers
      jwtid: jwtId,
      audience: "",
    }
  )

  return accessToken
}

export const newRefreshToken = (
  payload: IJWTRefreshPayload
) => {

  // verify a token symmetric
  const decodedAccessToken = jwt.verify(payload.accessToken, secret) as jwt.JwtPayload

  let refreshToken: string = jwt.sign(
    {
      type: "refresh",
    },
    secret,
    {
      // The issuer can freely set an algorithm to verify the signature on the token. However, some supported algorithms are insecure
      // HMAC using SHA-256 hash algorithm
      algorithm: "HS256",

      // Identifies the subject of the JWT
      subject: decodedAccessToken.sub,
      // Identifies the expiration time on and after which the JWT must not be accepted for processing. The value must be in seconds or a string describing a time span vercel/ms
      expiresIn: payload.durration,

      // Identifies principal that issued the JWT
      issuer: "snek-0",
      // Case-sensitive unique identifier of the token even among different issuers
      jwtid: decodedAccessToken.jti,
    }
  )

  return refreshToken
}

export const refreshAccessToken = (
  payload: IJWTRefreshPayload
) => {
  let jwtId: string = crypto.randomUUID()
  // verify a token symmetric
  const decodedAccessToken = jwt.verify(payload.accessToken, secret) as jwt.JwtPayload

  let accessToken: string = jwt.sign(
    {
      scope: decodedAccessToken.scope,
      fresh: false,
      type: "access",
    },
    secret,
    {
      // The issuer can freely set an algorithm to verify the signature on the token. However, some supported algorithms are insecure
      // HMAC using SHA-256 hash algorithm
      algorithm: "HS256",

      // Identifies the subject of the JWT
      subject: decodedAccessToken.sub,
      // Identifies the expiration time on and after which the JWT must not be accepted for processing. The value must be in seconds or a string describing a time span vercel/ms
      expiresIn: payload.durration,

      // Identifies principal that issued the JWT
      issuer: "snek-0",
      // Case-sensitive unique identifier of the token even among different issuers
      jwtid: jwtId,
      audience: "",
    }
  )

  return accessToken
}