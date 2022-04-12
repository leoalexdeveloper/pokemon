import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

export default{
    async get(uri: string){
        return await Api.get(uri)
    }
}
