export interface IJobListing {
  id: number,
  title: string,
  link: string
}

export interface IUser {
  id: number,
  name: string,
  titleExclusions: string[],
  contentExclusions: string[]
}