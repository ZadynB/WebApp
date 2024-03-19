import { FormControl, Autocomplete, AutocompleteOption, ListItemContent, Typography } from "@mui/joy";
import { forwardRef, useState, useEffect } from "react";

const SingerSongSearchBar = forwardRef((props, ref) => {
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
        placeholder='Singer song...'
        disabled={disabled}
        getOptionLabel={(option) => {
          return (option.song + ', ' + option.singer + ', ' + option.key);
        }}
        isOptionEqualToValue={(option, value) => option.song === value.song && 
                                                  option.author === value.author &&
                                                  option.singer === value.singer &&
                                                  option.key === value.key
        }
        options={options}
        renderOption={(properties, option) => (
          <AutocompleteOption {...properties}>
            <ListItemContent
              sx={{fontSize:'sm'}}
              onClick={() => {
                  props.onOptionClick(option);
              }}
              >
              {option.song}
              {option.preferred ? (
                <Typography level='body-xs'>
                  {option.singer}, {option.key} <code>*</code>
                </Typography>
                ) : (
                <Typography level='body-xs'>
                  {option.singer}, {option.key}
                </Typography>
                )
              }
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

export default SingerSongSearchBar;