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
import Divider from '@mui/material/Divider';
import Input from '@mui/joy/Input';

function AddEditServiceSong(props) {
  const selectedSong = props.info.selectedSong;
  const selectedService = props.info.selectedService;
  const singerSongs = props.info.singerSongs;
  const songs = props.info.songs;
  const editValue = props.info.editValue;

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [createNew, setCreateNew] = React.useState(true);
  const [singer, setSinger] = React.useState('');
  const [key, setKey] = React.useState('');
  const [singerSongData, setSingerSongData] = React.useState({song: '', author: '', singer: '', key: ''});
  const [songData, setSongData] = React.useState({title: '', author: ''})

  const orange = getComputedStyle(document.body).getPropertyValue('--orange2');

  const singerRef = React.createRef();
  const songRef = React.createRef();

  React.useEffect(() => {
    if (edit) {
      setSinger(selectedSong.singer);
      setKey(selectedSong.key);
    }
  }, [edit, selectedSong.key, selectedSong.singer])

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

  return (
    <React.Fragment>
      <Button
        size='sm'
        startDecorator={<Add />}
        onClick={() => {
          setEdit(false);
          setSinger('');
          setKey('');
          setOpen(true);
          setCreateNew(true);
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
          setOpen(true);
          setCreateNew(true);
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
            onClose={() => {setOpen(false); setEdit(false); setCreateNew(true);}}
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
                      serviceSongObj.singer = singer;
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
                    props.onCreate(serviceSongObj, isNewSong);
                    singerRef.current.children[1].click();
                  } else {
                    serviceSongObj.song = songData.title;
                    serviceSongObj.author = songData.author;
                    serviceSongObj.singer = singer;
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
                          songRef.current.children[1].click();
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
                        singerRef.current.children[1].click();
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
                      
                      <Input 
                        id='add-edit-singer'
                        placeholder='Singer...'
                        disabled={!createNew}
                        value={singer}
                        onChange={(newValue) => setSinger(newValue.target.value)}
                      />
                      <Input 
                        id='add-edit-key'
                        placeholder='Key...'
                        disabled={!createNew}
                        value={key}
                        onChange={(newValue) => setKey(newValue.target.value)}
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