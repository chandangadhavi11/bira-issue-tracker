import {useState, useEffect} from "react"

export const UpdateStatus = (id, status) => {
    const url = `/api/v1/issues/${id}`
    const [statusData, setStatusData] = useState([])
    const [statusLoading, setStatusLoading] = useState(true)
    const [statusError, setStatusError] = useState(false)

    var formdata = new FormData();
    formdata.append("status", `${status}`);

    var requestOptions = {
        method: 'PATCH',
        body: formdata,
        redirect: 'follow'
    };

    useEffect(() => {
        fetch(url, requestOptions).then((res) => res.json())
            .then((res) => setStatusData(res))
            .then(() => setStatusLoading(false))
            .catch(setStatusError(true))
    }, [url])

    return { statusData, statusLoading, statusError }
}