import { useState, useEffect } from "react";

export const GetIssue = (issueID) => {
    const url = `/api/v1/issues/${issueID}`
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