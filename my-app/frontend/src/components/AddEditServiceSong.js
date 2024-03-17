import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import SearchBar from './SearchBar';
import KeySearchBar from './KeySearchBar';
import SingerSearchBar from './SingerSearchBar';
import Divider from '@mui/material/Divider';

function getSingers(singersData) {
  let arr = [];
  for (const singer of singersData) {
    arr.push({
      name: singer.name
    });
  }
  return arr;
}

function AddEditServiceSong(props) {
  const selectedSong = props.info.selectedSong;
  const selectedService = props.info.selectedService;
  const singerSongs = props.info.singerSongs;
  const singers = getSingers(props.info.singers);
  const songs = props.info.songs;
  const editValue = props.info.editValue;

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [createNew, setCreateNew] = React.useState(true);
  const [singer, setSinger] = React.useState('');
  const [key, setKey] = React.useState('');
  const [singerSongData, setSingerSongData] = React.useState({song: '', author: '', singer: '', key: ''});
  const [songData, setSongData] = React.useState({title: '', author: ''})
  const [isNewSinger, setIsNewSinger] = React.useState(false);

  const orange = getComputedStyle(document.body).getPropertyValue('--orange2');
  const keys = ['A', 'A#/Bb', 'B/Cb', 'C/B#', 'C#/Db', 'D', 'D#/Eb', 'E/Fb', 'F/E#', 'F#/Gb', 'G', 'G#/Ab'];

  const singerRef = React.createRef();
  const songRef = React.createRef();
  const keyRef = React.createRef();
  const singerSearchRef = React.createRef();

  React.useEffect(() => {
    if (edit) {
      setSinger(selectedSong.singer);
      setKey(selectedSong.key);
      setSongData({title: selectedSong.song, author: selectedSong.author});
    }
  }, [edit, selectedSong])

  const selectSingerSong = (option) => {
    setSingerSongData({
      song: option.song,
      author: option.author,
      singer: option.singer,
      key: option.key
    });
  }

  const selectSong = (option) => {
    setSongData({
      title: option.title,
      author: option.author
    })
  }

  const selectKey = (option) => {
    console.log(option);
    setKey(option);
  }

  const selectSinger = (option) => {
    console.log(option);
    setSinger(option);
    setIsNewSinger(false);
  }

  const selectNewSinger = (option) => {
    console.log(option);
    setSinger({name: option.inputValue});
    setIsNewSinger(true);
  }

  return (
    <React.Fragment>
      <Button
        size='sm'
        startDecorator={<Add />}
        onClick={() => {

          // reset search bars
          if (!edit) {
            //safety check
            if (singerRef.current.children.length >= 3) {
              singerRef.current.children[1].click();
            }
          }

          //safety check
          if (songRef.current.children.length >= 3) {
            console.log('song');
            songRef.current.children[1].click();
          }

          //safety check
          if (keyRef.current.children.length >= 3) {
            console.log('key');
            keyRef.current.children[1].click();
          }

          setEdit(false);
          setSinger('');
          setKey('');
          setCreateNew(true);
          setOpen(true);
        }}
        sx={{
          backgroundColor: orange
        }}
        disabled={Object.keys(selectedService).length === 0 ? true: false}
      >
        Add
      </Button>
      <Button
        size='sm'
        startDecorator={<Edit />}
        onClick={() => {
          setEdit(true);
          setCreateNew(true);
          setOpen(true);
        }}
        sx={{
          backgroundColor: orange
        }}
        disabled={Object.keys(selectedSong).length === 0 ? true : false}
      >
        Edit
      </Button>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={!['exited', 'exiting'].includes(state)}
            onClose={() => {
              setOpen(false);
            }}
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              visibility: state === 'exited' ? 'hidden' : 'visible', 
            }}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: 'none',
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: `blur(8px)` },
                    entered: { opacity: 1, backdropFilter: `blur(8px)` },
                  }[state],
                },
              },
            }}
            keepMounted
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}              
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                { edit ? 'Edit Service Song' : 'Add Service Song'}
              </Typography>
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const serviceSongObj = {};
                  let isNewSong;

                  // do onUpdate if state is in edit mode
                  // otherwise do onCreate if state is not in edit mode
                  if (!edit) {
                    // determine if service song is created from scratch or from a previous singer song
                    if (createNew) {
                      serviceSongObj.parentId = selectedService.id;
                      serviceSongObj.song = songData.title;
                      serviceSongObj.author = songData.author;
                      if (Object.keys(singer).length !== 0 ) {
                        serviceSongObj.singer = singer.name;
                      } else {
                        serviceSongObj.singer = singer;
                      }
                      serviceSongObj.key = key;

                      isNewSong = true;
                      for (const song of singerSongs) {
                        if (song.singer === serviceSongObj.singer && 
                          song.author === serviceSongObj.author && 
                          song.song === serviceSongObj.song &&
                          song.key === serviceSongObj.key)
                        {
                          isNewSong = false;
                          break;
                        }
                      }
                    } else {
                      serviceSongObj.parentId = selectedService.id;
                      serviceSongObj.song = singerSongData.song;
                      serviceSongObj.author = singerSongData.author
                      serviceSongObj.singer = singerSongData.singer
                      serviceSongObj.key = singerSongData.key
                      isNewSong = false;
                    }
                    props.onCreate(serviceSongObj, isNewSong, isNewSinger);
                    singerRef.current.children[1].click();
                  } else {
                    serviceSongObj.song = songData.title;
                    serviceSongObj.author = songData.author;
                    if (Object.keys(singer).length !== 0 && typeof (singer) === 'object') {
                      serviceSongObj.singer = singer.name;
                    } else {
                      serviceSongObj.singer = singer;
                    }
                    serviceSongObj.key = key;
                    props.onUpdate(serviceSongObj, selectedSong.id);
                  }

                  // clear the search bar input value
                  songRef.current.children[1].click();
                  setOpen(false);
                }}
              >
                <Stack spacing={1}>
                  { !edit ?  (
                    <Stack spacing={1}>
                      <Typography id="modal-field-1" textColor="text.tertiary">
                        Create from existing
                      </Typography>
                      <div 
                        onClick={() => {
                          //reset search bar
                          //safety check
                          if (songRef.current.children.length >= 3) {
                            songRef.current.children[1].click();
                          }
                          
                          //safety check
                          if(keyRef.current.children.length >= 3) {
                            keyRef.current.children[1].click();
                          }

                          setCreateNew(false);
                          setSinger('');
                          setKey('');
                        }}
                      >
                        <SearchBar ref={singerRef} type='singerSongList' editValue={{}} options={singerSongs} onOptionClick={selectSingerSong} disabled={createNew}/>
                      </div>
                      <Divider
                        variant='middle'
                        sx={{
                          borderColor: 'black',
                          width: '100%',
                          borderWidth: '1px',
                        }}
                      >
                      </Divider>
                    </Stack>
                  ) : (
                    <></>
                  )}

                  <div
                    onClick={() => {
                      if (!edit) {
                        //reset search bar of singer song list
                        //safety check
                        if (singerRef.current.children.length >= 3) {
                          singerRef.current.children[1].click();
                        }
                        setCreateNew(true);
                      }
                    }}
                  >
                    <Stack spacing={1}>
                      {!edit ? (
                        <Typography id="modal-field-2" textColor="text.tertiary">
                          Create new
                        </Typography>
                      ) : (
                        <></>
                      )}
                      
                      {/* if edit mode is not on, then use the create mode search bar for new values */}
                      {/* otherwise, use the edit mode search bar */}
                      {!edit ? (
                        <SearchBar ref={songRef} type='songList' editValue={{}} options={songs} onOptionClick={selectSong} disabled={!createNew}/>
                      ) : (
                        <SearchBar ref={songRef} type='songList' editValue={editValue} options={songs} onOptionClick={selectSong} disabled={!createNew}/>
                      )}
                      
                      <SingerSearchBar
                        ref={singerSearchRef}
                        options={singers}
                        disabled={!createNew}
                        editValue={singer}
                        onOptionClick={selectSinger}
                        onNewOptionClick={selectNewSinger}
                      />

                      <KeySearchBar
                        ref={keyRef}
                        options={keys}
                        disabled={!createNew}
                        editValue={key}
                        onOptionClick={selectKey}
                      />
                    </Stack>
                  </div>
                  
                  <Button type='submit' color='primary'>
                    { edit ? 'Update': 'Create'}
                  </Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}

export default AddEditServiceSong;