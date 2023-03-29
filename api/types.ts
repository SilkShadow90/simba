export type ID = string
export type IDObject = { id: ID }

export type DateTimeISOString = string // YYYY-MM-DDTHH:mm:ss
export type url = string

export type UpdateMethodFunc<U = undefined> = (data?: U, successCallback?: () => void, errorCallback?: () => void) => Promise<void | null>
export type GetMethodFunc<T, U = undefined> = (data?: U) => Promise<T | void | null>

export type MethodFunc<T, U = undefined> = UpdateMethodFunc<U> | GetMethodFunc<T, U>

export type BaseDictionary = {
  code: string
  name: string
} & IDObject

export type Status = BaseDictionary

export type Nurser = {
  name: string
  worked: string
  nameWork: string
  suite: string
  phone: string
  email: string
  master: User[keyof IDObject]
  image: url
} & IDObject

export type User = {
  name: string
  catsIds: Array<Cat[keyof IDObject]>,
  breedIds: Array<Breed[keyof IDObject]>,
  phone: string
  email: string
  image: url,
  isReferee: boolean
  exhibitionRefereeIds?: Array<Exhibition[keyof IDObject]>
} & IDObject

export type Faq = {
  "title": string
  "description": string
  "points": string[]
} & IDObject

export type Info = {
  faqText: string
}

export type Breed = BaseDictionary

export type Title = {
  castration?: boolean
  kitten?: boolean
  junior?: boolean
  isHomeCat?: boolean
} & BaseDictionary

export type Cat = {
  name: string
  breedId: Breed[keyof IDObject]
  masterId: User[keyof IDObject]
  breederId: User[keyof IDObject]
  image: url
  favorite: boolean
  clubId: Club[keyof IDObject]
  nurserId: Nurser[keyof IDObject]
  exhibitionIds: Array<Exhibition[keyof IDObject]>
  exhibitionWinnerIds: Array<Exhibition[keyof IDObject]>
} & IDObject

export type Club = {
  name: string
  president: User[keyof IDObject]
} & IDObject

export type ExhibitionType = BaseDictionary

export type Exhibition = {
  location: string,
  typeId?: ExhibitionType[keyof IDObject],
  clubId?: Club[keyof IDObject],
  image: url
  dateStart: DateTimeISOString
  dateEnd: DateTimeISOString
  catIds: Array<Cat[keyof IDObject]>
  catWinnerIds: Array<Cat[keyof IDObject]>
} & IDObject

export type Feedback = {
  name: string
  phone: string
  email: string
  message: string
  status: Status[keyof IDObject]
} & IDObject

export type WithoutID<T> = Omit<T, keyof IDObject>
