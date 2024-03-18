import { FormControl, Autocomplete, AutocompleteOption, ListItemContent, Typography } from "@mui/joy";
import { forwardRef, useState, useEffect } from "react";


const SongSearchBar = forwardRef((props, ref) => {
  const options = props.options;
  const disabled = props.disabled;
  const editValue = props.editValue;
  
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (Object.keys(editValue).length !== 0) {
      setValue(editValue);
    }
  }, [editValue])

  return (
    <FormControl sx={{width: '100%'}}>
      <Autocomplete
        placeholder='Song...'
        disabled={disabled}
        getOptionLabel={(option) => {
          return (option.title + ', ' + option.author);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title && option.author === value.author}
        options={options}
        renderOption={(properties, option) => (
          <AutocompleteOption {...properties}>
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
          </AutocompleteOption>
        )}
        ref={ref}
        value={value}
        onChange={(event, newValue) =>{
          setValue(newValue);
        }}
      />
    </FormControl>
  );
});

export default SongSearchBar;