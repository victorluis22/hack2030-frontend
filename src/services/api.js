import axios from "axios";

export const api = axios.create({
    baseURL: 'https://hack2030-backend.onrender.com/'
})

export const getUsers = async () => {
    let url = '/users'

    return await api.get(url)
}

export const createUsers = async (name, email, password, address, lat, lon, points) => {
    let url = '/users'

    return await api.post(url, {name, email, password, address, lat, lon, points})
}

export const updateUserPoints = async (id, points) => {
    let url = `/users/${id}`

    return await api.put(url, {points})
}

export const getIniciatives = async () => {
    let url = '/iniciatives'

    return await api.get(url)
}

export const createIniciative = async (name, owner, address, emailOwner, actingArea, impact, type, points, mainOds, lat, lon) => {
    let url = '/iniciatives'

    return await api.post(url, {name, owner, address, emailOwner, actingArea, impact, type, points, mainOds, lat, lon})
}

export const createSession = async (email, password) => {
    return await api.post('/session', {email, password})
}