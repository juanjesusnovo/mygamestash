import axios from "axios"
const api = "http://localhost:3000/api/v1/"


export function reload() {
    setTimeout(function () {
        window.location.reload()
    }, 880)
}

export const getGames = async (array, url, number) => {
    let x = number
    const getData = async () => {
        await axios.get(`${api}${url}`)
        .then(res => {
        if(res == undefined){
            throw new Error("Error getting data from api")
        }
        while(array.length < 32){
            array.push(res.data.data[x])
            x++
        }
        return true
    })
    }
    getData()     
    }