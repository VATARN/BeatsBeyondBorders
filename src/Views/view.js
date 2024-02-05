import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import {
  fetchUsers,
  getHome,
  fetchGenres,
  fetchSongs,
  fetchGenreSongs,
  fetchUserSongs,
  fetchGenreUserSongs,
} from "../API";

const View = () => {
  let [users, setUsers] = useState([]);
  let [genres, setGenres] = useState([]);
  let [songs, setSongs] = useState([]);
  let [selectedUser, setSelectedUser] = useState("");
  let [selectedGenre, setSelectedGenre] = useState("");
  let [searchString, setSearchString] = useState("");

  // Fetch users when the component mounts
  useEffect(() => {
    callUserApi();
    callGenreApi();
    callSongApi();
  }, []);

  //   useEffect(() => {
  //     callGenreSongs();
  //   }, [selectedUser, selectedGenre]);

  const callGenreSongs = async (selectedGenre) => {
    let response = await fetchGenreSongs(selectedGenre);
    setSongs(response);
  };
  const callUserSongs = async (selectedUser) => {
    let response = await fetchUserSongs(selectedUser);
    setSongs(response);
  };
  const callGenreUserSongs = async (selectedUser, selectedGenre) => {
    let response = await fetchGenreUserSongs(selectedUser, selectedGenre);
    setSongs(response);
  };
  const callUserApi = async () => {
    let response = await fetchUsers();
    setUsers(response);
  };
  const callGenreApi = async () => {
    let response = await fetchGenres();
    setGenres(response);
  };
  const callSongApi = async () => {
    let response = await fetchSongs();
    console.log(response);
    setSongs(response);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    if (selectedGenre !== "") {
      callGenreUserSongs(e.target.value, selectedGenre);
    } else {
      callUserSongs(e.target.value);
    }
  };
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    if (selectedUser !== "") {
      callGenreUserSongs(selectedUser, e.target.value);
    } else {
      callGenreSongs(e.target.value);
    }
  };
  const handleSearchOnChange = (e) => {
    setSearchString(e.target.value);
  };

  //   const songs = [
  //     { name: "Letsgo", artist: "lestgo1", genre: "letsgo3" },
  //     { name: "Letsgo", artist: "lestgo1", genre: "letsgo3" },
  //   ];

  return (
    <React.Fragment>
      <div id="view">
        <header
          style={{
            color: "black",
            padding: "10px 20px",
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bolder",
          }}
        >
          <span role="img" aria-label="music-note">
            {" "}
            🎵{" "}
          </span>
          Beats Beyond Borders
          <span role="img" aria-label="music-note">
            {" "}
            🎵{" "}
          </span>
        </header>
        <div id="bar" style={{ display: "flex" }}>
          <div id="Dropdown-1">
            <Dropdown
              label="User"
              value={selectedUser}
              handleChange={handleUserChange}
              // here
              menuItems={users}
            />
          </div>
          <div id="Dropdown-2">
            <Dropdown
              label="Genre"
              value={selectedGenre}
              handleChange={handleGenreChange}
              menuItems={genres}
            />
          </div>
          <div id="Search" style={{ position: "absolute", right: 0 }}>
            <Search
              searchString={searchString}
              onChange={handleSearchOnChange}
            />
          </div>
        </div>
        <div id="Table">
          <Table rows={songs} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default View;
