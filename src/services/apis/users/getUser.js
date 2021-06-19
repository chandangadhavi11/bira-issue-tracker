import { useState, useEffect } from "react"

export const GetUser = (id) => {
    const url = `/api/v1/users/${id}`
    const [userData, setUserData] = useState([])
    const [userLoading, setUserLoading] = useState(true)
    const [userError, setUserError] = useState(false)

    useEffect(() => {
        
        fetch(url).then((res) => res.json())
            .then((res) => setUserData(res))
            .then(() => setUserLoading(false))
            .catch(setUserError(true))
    }, [url])

    return { userData, userLoading, userError }
}
