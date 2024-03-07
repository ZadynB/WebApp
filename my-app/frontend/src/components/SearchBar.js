import { FormControl, Autocomplete, AutocompleteOption, ListItemContent, Typography } from "@mui/joy";
import { forwardRef, useState, useEffect } from "react";


const SearchBar = forwardRef((props, ref) => {
  const options = props.options;
  const type = props.type;
  const disabled = props.disabled;
  const editValue = props.editValue;

  const [editVal, setEditVal] = useState(options[0]);
  const [newVal, setNewVal] = useState(null);

  useEffect(() => {
    if (Object.keys(editValue).length !== 0) {
      setEditVal(editValue);
    }
  }, [editValue])

  const getOptionComponent = (option) => {
    if (type === 'songList') {
      return (
        <ListItemContent 
          sx={{fontSize:'sm'}}
          onClick={() => {
            props.onOptionClick(option);
          }}
        >
          {option.title}
          <Typography level='body-xs'>
            {option.author}
          </Typography>
        </ListItemContent>
      );
    } else if (type === 'singerSongList') {
      return (
        <ListItemContent
          sx={{fontSize:'sm'}}
          onClick={() => {
            props.onOptionClick(option);
          }}
        >
          {option.song}
          <Typography level='body-xs'>
            {option.singer}, {option.key}
          </Typography>
        </ListItemContent>
      );
    }
  }

  return (
    <FormControl sx={{width: '100%'}}>
      {Object.keys(editValue).length !== 0 ? (
        // search bar for editing values
        <Autocomplete
          placeholder='Search...'
          disabled={disabled}
          getOptionLabel={(option) => {
            if (type === 'songList') {
              return (option.title + ', ' + option.author);
            } else if (type === 'singerSongList') {
              return (option.song + ', ' + option.singer);
            }
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={options}
          renderOption={(properties, option) => (
            <AutocompleteOption {...properties}>
              {getOptionComponent(option)}
            </AutocompleteOption>
          )}
          ref={ref}
          value={editVal}
          onChange={(event, newVal) =>{
            setEditVal(newVal);
          }}
        />
      ) : (
        // search bar for new values
        <Autocomplete
          placeholder='Search...'
          disabled={disabled}
          getOptionLabel={(option) => {
            if (type === 'songList') {
              return (option.title + ', ' + option.author);
            } else if (type === 'singerSongList') {
              return (option.song + ', ' + option.singer + ', ' + option.key);
            }
          }}
          options={options}
          renderOption={(properties, option) => (
            <AutocompleteOption {...properties}>
              {getOptionComponent(option)}
            </AutocompleteOption>
          )}
          ref={ref}
          value={newVal}
          onChange={(event, newValue) => {
            setNewVal(newValue);
          }}
        />
      )}
    </FormControl>
  );
});

export default SearchBar;