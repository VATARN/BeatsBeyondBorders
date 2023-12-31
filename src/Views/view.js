import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import Dropdown from '../components/Dropdown';
import Table from '../components/Table';
import { getHome } from '../API';

const View = () => {

    let [selectedUser, setSelectedUser] = useState("None");
    let [selectedGenre, setSelectedGenre] = useState("None");
    let [searchString, setSearchString] = useState("");

    useEffect(() => {
        console.log(selectedUser, selectedGenre, searchString);
    }, [selectedUser, selectedGenre, searchString]);

    const userMenu = [
        { value: 'None', label: 'None' },
        { value: 'Arnav', label: 'Arnav' },
        { value: 'Becky', label: 'Becky' },
        { value: 'Chad', label: 'Chad' },
        { value: 'Nirjari', label: 'Nirjari' },
    ];

    const genreMenu = [
        { value: 'None', label: 'None' },
        { value: 'Pop', label: 'Pop' },
        { value: 'Hip-Hop', label: 'Hip-Hop' },
        { value: 'Country', label: 'Country' },
        { value: 'K-Pop', label: 'K-Pop' },
    ];

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    }
    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    }
    const handleSearchOnChange = (e) => {
        setSearchString(e.target.value);
    }

    const songs = [
        { "name": "Letsgo", artist: "lestgo1", genre: "letsgo3" },
        { "name": "Letsgo", artist: "lestgo1", genre: "letsgo3" },
    ];

    return (
        <React.Fragment>
            <div id="view">
                <header style={{
                    color: 'black',
                    padding: '10px 20px',
                    textAlign: 'center',
                    fontSize: '30px',
                    fontWeight: "bolder"
                }}>
                    <span role="img" aria-label="music-note"> 🎵 </span>
                    Beats Beyond Borders
                    <span role="img" aria-label="music-note"> 🎵 </span>
                </header>
                <div id="bar" style={{ display: "flex" }}>
                    <div id="Dropdown-1">
                        <Dropdown label="User" value={selectedUser} handleChange={handleUserChange} menuItems={userMenu} />
                    </div>
                    <div id="Dropdown-2">
                        <Dropdown label="Genre" value={selectedGenre} handleChange={handleGenreChange} menuItems={genreMenu} />
                    </div>
                    <div id="Search" style={{ position: "absolute", right: 0 }}>
                        <Search searchString={searchString} onChange={handleSearchOnChange} />
                    </div>
                </div>
                <div id="Table">
                    <Table rows={songs} />
                </div>
            </div>
        </React.Fragment >
    );
}

export default View;
