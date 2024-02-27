import { FormControl, FormLabel, Autocomplete, AutocompleteOption, ListItemContent, Typography } from "@mui/joy";
import { Search } from "@mui/icons-material";

function SearchBar(props) {
  const options = props.options;

  return (
    <FormControl id='search-bar' sx={{width: '100%'}}>
      <FormLabel sx={{color: 'white'}}>Search songs</FormLabel>
      <Autocomplete
        placeholder='Search...'
        endDecorator={<Search />}
        type="search"
        freeSolo
        disableClearable
        getOptionLabel={(option) => option.title+option.author}
        options={options}
        renderOption={(properties, option) => (
          <AutocompleteOption {...properties} onClick={() => props.onOptionClick(option)}>
            <ListItemContent sx={{fontSize:'sm'}}>
              {option.title}
              <Typography level='body-xs'>
                {option.author}
              </Typography>
            </ListItemContent>
          </AutocompleteOption>
        )}
      />
    </FormControl>
  );
}

export default SearchBar;