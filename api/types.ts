export type MethodFunc<T, U = undefined> = (data?: U, successCallback?: () => void, errorCallback?: () => void) => Promise<T | void | null>

export type Nurser = {
  id: string
  name: string
  worked: string
  nameWork: string
  suite:string
  phone: string
  email: string
  image: string
}

export type User = {
  id: string
  name: string
  catName: string
  breed: string
  phone: string
  email: string
  prizes?: string[]
  image: string,
  isReferee: boolean
  exhibitions: string[]
  exhibitionsWinner: string[]
}

export type Breed = {
  id: string
  value: string
  description: string
}

export type Title = {
  id: string
  value: string
  description: string
  castration?: boolean
  kitten?: boolean
  junior?: boolean
  isHomeCat?: boolean
}

export type Cat = {
  id: string
  name: string
  breed: string
  image: string
  csssrc: string
  favorite: boolean
  club: string
}

export type Exhibition = {
  id: string
  location: string,
  type?: string,
  club?: string,
  image: string
  csssrc: string
  dateStart: string
  dateEnd: string
}

export type Feedback = {
  id: string
  name: string
  phone: string
  email: string
  text: string
}
