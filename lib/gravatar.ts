import { sha256 } from 'js-sha256'

export const genAvatar = (str: string) => {
  const hash = sha256(str)
  return `https://gravatar.com/avatar/${hash}?d=identicon&r=PG&s=128`
}
