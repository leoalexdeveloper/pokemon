import TeamInterface from '@//interfaces/Team.ts'
import { v4 as uuidv4 } from 'uuid'

export default class Team implements TeamInterface{
    private uuid: string
    private createdAt: Date
    public updatedAt: Date
    constructor(
        public name: string = '',
        public team: object[] = [],
        public rating: number = 1
    ){
        this.uuid = uuidv4()
        this.createdAt = Date.now()
        this.updatedAt = Date.now()
    }
}