export default{
    firstNameCaps(name: string){
        return (name.substring(0, 1).toUpperCase() + name.substr(1))
    },
    returnFormatedTimestamp(timestamp: number): string {
        const formatBellowZero = (number:number) => (number < 10) ? 0+String(number) : number
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = formatBellowZero(date.getMonth())
        const day = formatBellowZero(date.getDate())
        const hour = formatBellowZero(date.getHours())
        const minute = formatBellowZero(date.getMinutes())
        const second = formatBellowZero(date.getSeconds())
        const fractionDayReference = (hour > '00' && hour < 13) ? 'AM' : 'PM' 
        return(`${day}/${month}/${year} - ${hour}:${minute}:${second} ${fractionDayReference}`)
    }
}