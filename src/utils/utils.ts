export default{
    firstNameCaps(name: string){
        return (name.substring(0, 1).toUpperCase() + name.substr(1))
    }
}