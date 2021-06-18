import { useState, useEffect } from "react"

export const GetUserList = () => {
    const url = `/api/v1/users`
    const [userListData, setUserListData] = useState()
    const [userListLoading, setUserListLoading] = useState(true)
    const [userListError, setUserListError] = useState(false)

    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((res) => setUserListData(res))
            .then(() => setUserListLoading(false))
            .catch(setUserListError(true))
    }, [url])

    return { userListData, userListLoading, userListError }
}
