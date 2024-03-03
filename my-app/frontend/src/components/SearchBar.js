import { FormControl, Autocomplete, AutocompleteOption, ListItemContent, Typography } from "@mui/joy";
// import { Search } from "@mui/icons-material";
import { forwardRef } from "react";


const SearchBar = forwardRef((props, ref) => {
  const options = props.options;
  const type = props.type;
  const disabled = props.disabled;

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
        options={options}
        renderOption={(properties, option) => (
          <AutocompleteOption {...properties}>
            {getOptionComponent(option)}
          </AutocompleteOption>
        )}
        ref={ref}
      />
    </FormControl>
  );
});

// function SearchBar(props) {
//   const options = props.options;
//   const type = props.type;
//   const disabled = props.disabled;

//   const getOptionComponent = (option) => {
//     if (type === 'songList') {
//       return (
//         <ListItemContent 
//           sx={{fontSize:'sm'}}
//           onClick={() => {
//             props.onOptionClick(option);
//           }}
//         >
//           {option.title}
//           <Typography level='body-xs'>
//             {option.author}
//           </Typography>
//         </ListItemContent>
//       );
//     } else if (type === 'singerSongList') {
//       return (
//         <ListItemContent
//           sx={{fontSize:'sm'}}
//           onClick={() => {
//             props.onOptionClick(option);
//           }}
//         >
//           {option.song}
//           <Typography level='body-xs'>
//             {option.singer}, {option.key}
//           </Typography>
//         </ListItemContent>
//       );
//     }
//   }

//   return (
//     <FormControl sx={{width: '100%'}}>
//       <Autocomplete
//         placeholder='Search...'
//         disabled={disabled}
//         endDecorator={<Search />}
//         type="search"
//         getOptionLabel={(option) => {
//           if (type === 'songList') {
//             return (option.title + ', ' + option.author);
//           } else if (type === 'singerSongList') {
//             return (option.song + ', ' + option.singer);
//           }
//         }}
//         options={options}
//         renderOption={(properties, option) => (
//           <AutocompleteOption {...properties}>
//             {getOptionComponent(option)}
//           </AutocompleteOption>
//         )}
//       />
//     </FormControl>
//   );
// }

export default SearchBar;