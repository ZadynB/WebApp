import { FormControl, Autocomplete, AutocompleteOption, ListItemContent, Typography } from "@mui/joy";
import { Search } from "@mui/icons-material";

function SearchBar(props) {
  const options = props.options;
  const type = props.type;
  const disabled = props.disabled;

  const getOptionComponent = (option) => {
    if (type === 'songList') {
      return (
        <ListItemContent sx={{fontSize:'sm'}}>
          {option.title}
          <Typography level='body-xs'>
            {option.author}
          </Typography>
        </ListItemContent>
      );
    } else if (type === 'singerSongList') {
      return (
        <ListItemContent sx={{fontSize:'sm'}}>
          {option.song}
          <Typography level='body-xs'>
            {option.singer}, {option.key}
          </Typography>
        </ListItemContent>
      );
    }
  }

  return (
    <FormControl id='search-bar' sx={{width: '100%'}}>
      <Autocomplete
        placeholder='Search...'
        disabled={disabled}
        endDecorator={<Search />}
        type="search"
        freeSolo
        disableClearable
        getOptionLabel={(option) => {
          if (type === 'songList') {
            return (option.title + ', ' + option.author);
          } else if (type === 'singerSongList') {
            return (option.song + ', ' + option.singer);
          }
        }}
        options={options}
        renderOption={(properties, option) => (
          <AutocompleteOption {...properties} onClick={() => props.onOptionClick(option)}>
            {getOptionComponent(option)}
          </AutocompleteOption>
        )}
      />
    </FormControl>
  );
}

export default SearchBar;