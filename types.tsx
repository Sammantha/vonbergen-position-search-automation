export interface IJobListing {
  id: number,
  title: string,
  link: string
  userId: number
}

export interface IUser {
  id: number,
  name: string,
  titleExclusions: string[],
  contentExclusions: string[]
}