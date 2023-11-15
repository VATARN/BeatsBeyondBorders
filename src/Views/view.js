import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const View = () => {

    let projectId = useSelector((state) => state.user.projectId);
    let [loginSuccess, setLoginSuccess] = useState(false);


    useEffect(() => {
        console.log("letsgo", projectId, loginSuccess);
        setLoginSuccess(true);
    }, [projectId, loginSuccess])

    return (
        <React.Fragment>
            <div id="view">
                BEATS BEYOND BORDERS
            </div>
        </React.Fragment >
    );
}

export default View;
