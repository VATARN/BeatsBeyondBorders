import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchBar(props) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="filled-basic"
                label="Search"
                variant="filled"
                type="text"
                value={props.searchString}
                onChange={props.onChange} />
        </Box>
    );
}