import { useState, useEffect } from "react"
import axios from "axios"

export const DeleteIssue = (id) => {
    var config = {
        method: 'delete',
        url: `/api/v1/issues/${id}/`,
        headers: {
            'Cookie': 'csrftoken=CKzGWlNndN1JPtkPwioBsxCxAG803Dzdf0YZhd37yEojX70aHmJPCveCsK8RMOgH'
        }
    };


    axios(config)
        .then((response) => {
            console.log("Succesfully Deleted");
        })
        .catch((error) => {
            console.log(error);
        });
}