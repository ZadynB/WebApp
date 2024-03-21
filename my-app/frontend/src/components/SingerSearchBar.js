import { Add } from "@mui/icons-material";
import { FormControl, Autocomplete, AutocompleteOption, ListItemContent, createFilterOptions, ListItemDecorator } from "@mui/joy";
import { forwardRef, useState, useEffect } from "react";


const SingerSearchBar = forwardRef((props, ref) => {
  const options = props.options;
  const disabled = props.disabled;
  const editValue = props.editValue;

  const filter = createFilterOptions();

  const [value, setValue] = useState(null);
  const [inValue, setInValue] = useState('');

  useEffect(() => {
    if (Object.keys(editValue).length !== 0) {
      setValue(editValue);
    }

    if (editValue === '') {
      setValue(null);
      setInValue('');
    }
  }, [editValue])

  return (
    <FormControl sx={{width: '100%'}}>
      <Autocomplete
        placeholder='Singer...'
        disabled={disabled}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        options={options}
        renderOption={(properties, option) => (
          <AutocompleteOption {...properties}>
            {option.name?.startsWith('Add "') && (
              <ListItemDecorator>
                <Add />
              </ListItemDecorator>
            )}
            <ListItemContent 
              onClick={() => {
                if (option.name?.startsWith('Add "')) {
                  props.onNewOptionClick(option);
                } else {
                  props.onOptionClick(option);
                }
              }}
            >
              {option.name}
            </ListItemContent>
          </AutocompleteOption>
        )}
        ref={ref}
        value={value}
        inputValue={inValue}
        onChange={(event, newValue) => {
          if (newValue && newValue.inputValue) {
            //create a new value from the user input
            setValue(newValue.inputValue);
          } else {
            setValue(newValue);
          }
        }}
        onInputChange={(event, newInValue) => {
          setInValue(newInValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;

          //suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.name);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              name: `Add "${inputValue}"`
            })
          }

          return filtered;
        }}
        freeSolo
        getOptionLabel={(option) => {
          // value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          //Regular option
          return option.name;
        }}
        clearOnBlur
      />
    </FormControl>
  );
});

export default SingerSearchBar;