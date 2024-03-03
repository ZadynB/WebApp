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

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [createNew, setCreateNew] = React.useState(true);
  const [singer, setSinger] = React.useState('');
  const [key, setKey] = React.useState('');
  const [singerSongData, setSingerSongData] = React.useState({song: '', author: '', singer: '', key: ''});
  const [songData, setSongData] = React.useState({title: '', author: ''})

  const orange = getComputedStyle(document.body).getPropertyValue('--orange2');

  const singerRef = React.createRef();

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
    // console.log('song selected');
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
        }}
        sx={{
          backgroundColor: orange
        }}
      >
        Add
      </Button>
      <Button
        size='sm'
        startDecorator={<Edit />}
        onClick={() => {
          setEdit(true);
          setOpen(true);
        }}
        sx={{
          backgroundColor: orange
        }}
        disabled={ Object.keys(selectedSong).length === 0 ? true : false }
      >
        Edit
      </Button>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={!['exited', 'exiting'].includes(state)}
            onClose={() => setOpen(false)}
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

                  if (!edit) {
                    if (createNew) {
                      serviceSongObj.parentId = selectedService.id;
                      serviceSongObj.song = songData.title;
                      serviceSongObj.author = songData.author;
                      serviceSongObj.singer = singer;
                      serviceSongObj.key = key;
                    } else {
                      serviceSongObj.parentId = selectedService.id;
                      serviceSongObj.song = singerSongData.song;
                      serviceSongObj.author = singerSongData.author
                      serviceSongObj.singer = singerSongData.singer
                      serviceSongObj.key = singerSongData.key
                    }
                    props.onCreate(serviceSongObj);
                  } else {

                  }
                  // if (createNew) {
                  //   console.log ('here');
                  //   // for add and edit
                  //   if (!edit) {
                  //     serviceSongObj.parentId = selectedService.id
                  //     serviceSongObj.song = 
                  //   }
                  // } else {
                  //   console.log('there');
                  //   // for only add
                  // }
                  // const serviceObj = {
                  //   worshipLeader: worshipLeader,
                  // };

                  // if (!edit) {
                  //   props.onCreate(serviceObj);
                  // } else {
                  //   serviceObj.numSongs = selected.numSongs;
                  //   props.onUpdate(serviceObj, selected.id);
                  // }
                  console.log(singerRef.current.children[0].children[0].value);
                  singerRef.current.children[0].children[0].value = '';
                  console.log(singerRef.current.children[0].children[0].value);
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
                          setCreateNew(false);
                          setSinger('');
                          setKey('');
                        }}
                      >
                        <SearchBar ref={singerRef} type='singerSongList' options={singerSongs} onOptionClick={selectSingerSong} disabled={createNew}/>
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
                      setCreateNew(true);
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
                      
                      <SearchBar type='songList' options={songs} onOptionClick={selectSong} disabled={!createNew}/>
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