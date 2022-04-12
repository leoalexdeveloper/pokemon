export default class LocalStorage{
    static set(storageName: string, data: object){
        const dataStringified = JSON.stringify(data)
        window.localStorage.setItem(storageName, dataStringified)
    }

    static get(storageName: string){
        const data: any = window.localStorage.getItem(storageName)
        return JSON.parse(data)
    }

    static checkStorage(storageName: string){
        return (window.localStorage[storageName]) ? true : false
    }
}