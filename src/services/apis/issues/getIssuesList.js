import { useState, useEffect } from "react"

export const GetIssuesList = () => {
    const url = `/api/v1/issues`
    const [issueData, setIssueData] = useState()
    const [issueLoading, setIssueLoading] = useState(true)
    const [issueError, setIssueError] = useState(false)

    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((res) => setIssueData(res))
            .then(() => setIssueLoading(false))
            .catch(setIssueError(true))
    }, [url])

    return { issueData, issueLoading, issueError }
}

export const GetTodoIssuesList = () => {
    const url = `/api/v1/issues?status=TODO`
    const [todoData, setTodoData] = useState()
    const [todoLoading, setTodoLoading] = useState(true)
    const [todoError, setTodoError] = useState(false)
    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((res) => setTodoData(res))
            .then(() => setTodoLoading(false))
            .catch(setTodoError(true))
    }, [url])
    return { todoData, todoLoading, todoError }
}

export const GetInProgressIssuesList = () => {
    const url = `/api/v1/issues?status=DOING`
    const [ipData, setIPData] = useState()
    const [ipLoading, setIPLoading] = useState(true)
    const [ipError, setIPError] = useState(false)
    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((res) => setIPData(res))
            .then(() => setIPLoading(false))
            .catch(setIPError(true))
    }, [url])
    return { ipData, ipLoading, ipError }
}

export const GetDoneIssuesList = () => {
    const url = `/api/v1/issues?status=DONE`
    const [doneData, setDoneData] = useState()
    const [doneLoading, setDoneLoading] = useState(true)
    const [doneError, setDoneError] = useState(false)
    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((res) => setDoneData(res))
            .then(() => setDoneLoading(false))
            .catch(setDoneError(true))
    }, [url])
    return { doneData, doneLoading, doneError }
}

export const GetHPIssuesList = () => {
    const url = `/api/v1/issues?priority=HIGH`
    const [hPData, setHPData] = useState()
    const [hPLoading, setHPLoading] = useState(true)
    const [hPError, setHPError] = useState(false)
    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((res) => setHPData(res))
            .then(() => setHPLoading(false))
            .catch(setHPError(true))
    }, [url])
    return { hPData, hPLoading, hPError }
}

export const GetRUI = () => {

    const url = `/api/v1/issues`
    const [ruiData, setRUIData] = useState()
    const [ruiLoading, setRUILoading] = useState(true)
    const [ruiError, setRUIError] = useState(false)

    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((res) => setRUIData(res))
            .then(() => setRUIData((data) => data.reverse()))
            .then(() => setRUILoading(false))
            .catch(setRUIError(true))
    }, [url])

    return { ruiData, ruiLoading, ruiError }
}