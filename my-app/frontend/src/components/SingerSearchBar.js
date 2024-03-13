import { FormControl, Autocomplete, AutocompleteOption, ListItemContent } from "@mui/joy";
import { forwardRef, useState, useEffect } from "react";


const SingerSearchBar = forwardRef((props, ref) => {
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
        placeholder='Singer...'
        disabled={disabled}
        isOptionEqualToValue={(option, value) => option === value}
        options={options}
        renderOption={(properties, option) => (
          <AutocompleteOption {...properties}>
            <ListItemContent 
              onClick={() => {
                  props.onOptionClick(option);
              }}
            >
              {option}
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

export default SingerSearchBar;