import { IUser } from './types';

const mockUsers: IUser[] = [
    {
        id: 1,
        name: "Sam",
        titleExclusions: ["Lead", "Principal", "Manager", "AI", "Frontend"],
        contentExclusions: ["AI", "C#", ".NET"]
    },
    {
        id: 2,
        name: "Ashton",
        titleExclusions: ["AI"],
        contentExclusions: ["AI"]
    }
];

export default mockUsers;