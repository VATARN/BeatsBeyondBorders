const getApiURL = (type, value, value2) => {
  let URL = "http://127.0.0.1:8001";

  switch (type) {
    case "getHome":
      URL += "/";
      break;
    case "fetchUsers":
      URL += "/members";
      break;
    case "fetchGenres":
      URL += "/genres";
      break;
    case "fetchSongs":
      URL += "/songs";
      break;
    case "genreSongs":
      URL += "/" + value;
      break;
    case "userSongs":
      URL += "/api/" + value;
      break;
    case "fetchGenreUserSongs":
      URL += "/api/" + value + "/" + value2;
      break;
    default:
      break;
  }
  return URL;
};

const getAPIRequest = (type, request) => {
  let header = {
    "Content-Type": "application/json",
  };
  let requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(request),
  };
  if (
    type === "getHome" ||
    "fetchUsers" ||
    "fetchGenres" ||
    "fetchSongs" ||
    "genreSongs" ||
    "userSongs" ||
    "fetchGenreUserSongs"
  ) {
    requestOptions = {
      method: "GET",
      headers: header,
    };
  }

  return requestOptions;
};

const getAPIResponse = async (type, request, value, value2) => {
  let url = "";
  if (value2 !== null || (undefined && value !== null) || undefined) {
    url = getApiURL(type, value, value2);
  } else if (value !== null || undefined) {
    url = getApiURL(type, value);
  } else {
    url = getApiURL(type);
  }
  const requestObj = getAPIRequest(type, request);
  let response = await (await fetch(url, requestObj)).json();
  return response;
};

export async function getHome(request) {
  try {
    let response = await getAPIResponse("getHome", request, "");
    console.log(response);
  } catch (error) {
    console.log("error in login API", error);
  }
}

export async function fetchUsers() {
  try {
    let users_list = [];
    let response = await getAPIResponse("fetchUsers", "");
    response.forEach((ele) => {
      users_list.push({ label: ele.first_name, value: ele.first_name });
    });
    return users_list;
  } catch (error) {
    console.log("error in fetchUsers API", error);
  }
}
export async function fetchGenres() {
  try {
    let genres_list = [];
    let response = await getAPIResponse("fetchGenres", "");
    console.log("Genres", response);
    response.forEach((ele) => {
      genres_list.push({ label: ele.name, value: ele.name });
    });
    return genres_list;
  } catch (error) {
    console.log("error in fetchGenres API", error);
  }
}
export async function fetchSongs() {
  try {
    let songs_list = [];
    let response = await getAPIResponse("fetchSongs", "");
    console.log("Songs", response);
    response.forEach((ele) => {
      songs_list.push({ name: ele.Name, artist: ele.Artist });
    });
    return songs_list;
  } catch (error) {
    console.log("error in fetchSongs API", error);
  }
}

export async function fetchGenreSongs(value) {
  try {
    let songs_list = [];
    let response = await getAPIResponse("genreSongs", "", value);
    console.log("Songs", response);
    response.forEach((ele) => {
      songs_list.push({ name: ele.Name, artist: ele.Artist });
    });
    return songs_list;
  } catch (error) {
    console.log("error in fetchGenreSongs API", error);
  }
}

export async function fetchUserSongs(value) {
  try {
    let songs_list = [];
    let response = await getAPIResponse("userSongs", "", value);
    console.log("Songs", response);
    response.forEach((ele) => {
      songs_list.push({ name: ele.Name, artist: ele.Artist });
    });
    return songs_list;
  } catch (error) {
    console.log("error in fetchUserSongs API", error);
  }
}

export async function fetchGenreUserSongs(value, value2) {
  try {
    let songs_list = [];
    let response = await getAPIResponse(
      "fetchGenreUserSongs",
      "",
      value,
      value2
    );
    console.log("Songs", response);
    response.forEach((ele) => {
      songs_list.push({ name: ele.Name, artist: ele.Artist });
    });
    return songs_list;
  } catch (error) {
    console.log("error in fetchUserSongs API", error);
  }
}
// export const fetchUsers = async () => {
//     const response = await fetch(`/members`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         let users_list = [];
//         data.forEach((ele) => {
//           users_list.push({ label: ele.first_name, value: ele.first_name });
//         });
//         setUsers(users_list);
//         console.log(users);
//         console.log("data", data);
//         console.log("list:", users_list);
//       })
//       .catch((error) => console.error(error));
//   };
