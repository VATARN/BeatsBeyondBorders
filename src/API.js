const getApiURL = (type) => {
    let URL = "http://127.0.0.1:5000";

    switch (type) {
        case "getHome":
            URL += "/";
            break;
        default:
            break;
    }
    return URL;
};

const getAPIRequest = (type, request) => {
    let header = {
        'Content-Type': 'application/json',
    };
    let requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(request)
    };
    if (type === "getHome") {
        requestOptions = {
            method: 'GET',
            headers: header
        }
    }

    return requestOptions;
};

const getAPIResponse = async (type, request, accessToken) => {
    const url = getApiURL(type);
    const requestObj = getAPIRequest(type, request, accessToken)
    let response = await (await fetch(url, requestObj)).json();
    return response;
};

export async function getHome(request, dispatch) {
    try {
        let response = await getAPIResponse("getHome", request, "");
        console.log(response);
    } catch (error) {
        console.log("error in login API", error)
    }
}
