import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSpringRef, animated, useSpring } from '@react-spring/web';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import SearchBar from '../components/SearchBar';
import CustomDataGrid from '../components/CustomDataGrid';
import InfoModal from '../components/InfoModal';
import AddEditService from '../components/AddEditService';
import DeleteService from '../components/DeleteService';
import AddEditServiceSong from '../components/AddEditServiceSong';
import DeleteServiceSong from '../components/DeleteServiceSong';
import Remove from '@mui/icons-material/Remove';
import Info from '@mui/icons-material/Info';
import CloseRounded from '@mui/icons-material/CloseRounded';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import FormLabel from '@mui/joy/FormLabel';

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function SVNTCOG () {
  const [refresh, setRefresh] = useState(false);
  const [showSongsTable, setShowSongsTable] = useState(false);
  const [status, setStatus] = useState('neutral');
  const [songs, setSongs] = useState([]);
  const [singerSongs, setSingerSongs] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceSongs, setServiceSongs] = useState([]);
  const [info, setInfo] = useState({title: '', desc: ''});
  const [loading, setLoading] = useState(false);
  const [serviceSelected, setServiceSelected] = useState({});
  const [serviceSongSelected, setServiceSongSelected] = useState({});
  const [editValue, setEditValue] = useState({});
  const [notification, setNotification] = useState('');

  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  const serviceColumns = [
    { field: 'date', headerName: 'Date', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'worshipLeader', headerName: 'Worship Leader', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'numSongs', headerName: 'No. of Songs', flex: 1, headerAlign: 'center', align: 'center'}
  ];

  const songsColumns = [
    { field: 'song', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'singer', headerName: 'Singer', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'author', headerName: 'Author', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'key', headerName: 'Key', flex: 1, headerAlign: 'center', align: 'center'}
  ];

  const springRef = useSpringRef();
  const spring = useSpring({
    from: notification !== '' ? { opacity: 0, y: 0 } : { opacity: 1, y: 10 },
    to: notification !== '' ? { opacity: 1, y: 10 } : { opacity: 0, y: 0 },
    ref: springRef,
    config: {
      duration: 150,
    },
  });

  useEffect(() => {
    console.log('refreshed');
    setLoading(true);
    (async () => {
      await sleep(1e3);

      try {
        // call to route to get songs
        axios
          .get('http://localhost:5555/songs')
          .then((response) => {
            setSongs(response.data.data);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });

        // call to route to get singer songs
        axios
          .get('http://localhost:5555/singerSongs')
          .then((response) => {
            setSingerSongs(response.data.data);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          })
  
        // call to route to get services
        axios
          .get('http://localhost:5555/services')
          .then((response) => {
            if (response.data.data.length === 0) {
              setShowSongsTable(false);
            }
            setServices(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
        });

        setServiceSelected({});
        setServiceSongSelected({});
        setServiceSongs([]);
        setInfo({ title: '', desc: '' });
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    })();    
  }, [refresh]);

  useEffect(() => {
    (async () => {
      if (notification !== '') {
        await sleep(1.5e3);
      }
      springRef.start();
    })();
    
  }, [notification, springRef]);

  const displayServiceSongs = (rowParams) => {
    // call to route to get the service songs
    try {
      axios
        .get('http://localhost:5555/serviceSongs/byParentId', {
          params: {
            parentId: rowParams.row.id
          }
        })
        .then((response) => {
          setServiceSongs(response.data.data);
          setServiceSelected(rowParams.row);
          setServiceSongSelected({});
          setShowSongsTable(true);
        })
        .catch((error) => {
          console.log(error.message);
        })
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectServiceSong = (rowParams) => {
    setServiceSongSelected(rowParams.row);

    // find song and set the lyrics for the edit value
    let lyrics = '';
    let songId = '';
    for (const song of songs) {
      if (song.author === rowParams.row.author &&
          song.title === rowParams.row.song)
      {
        songId = song.id;
        lyrics = song.lyrics;
        break;
      }
    }
    setEditValue({
      id: songId,
      author: rowParams.row.author,
      title: rowParams.row.song,
      lyrics: lyrics
    })
  };

  const displaySongLyrics = (option) => {
    setInfo({
      title: option.title + '\n' + option.author,
      desc:  option.lyrics
    });
  };

  const addService = (serviceObj) => {
    // route to add service
    setLoading(true);
    try {
      axios
        .post('http://localhost:5555/services', serviceObj)
        .then((response) => {
          setRefresh(!refresh);
          setStatus('success');
          setNotification('Successfully created service!');
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setStatus('danger');
          setNotification(error.response.data.message);
          setLoading(false);
        })
    } catch (error) {
      console.log(error.message);
    }
  };

  const editService = (serviceObj, id) => {
    //route to edit service
    setLoading(true);
    try {
      axios
        .put(`http://localhost:5555/services/${id}`, serviceObj)
        .then((response) => {
          setRefresh(!refresh);
          setStatus('success');
          setNotification('Successfully updated service!');
        })
        .catch((error) => {
          console.log(error.message);
          setStatus('danger');
          setNotification('Error updating service!');
          setLoading(false);
        })
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteService = (id) => {
    // route to delete service
    setLoading(true);

    // need to delete all of the children service songs first
    try {
      // get service songs
      axios
        .get('http://localhost:5555/serviceSongs/byParentId', {
          params: {
            parentId: id
          }
        })
        .then((response) => {
          // delete service songs
          for (const serviceSong of response.data.data) {
            axios
              .delete(`http://localhost:5555/serviceSongs/${serviceSong.id}`)
              .catch((error) => {
                console.log(error.message);
                setLoading(false);
              })
          }
        })
        .then(() => {
          // delete the service
          axios
            .delete(`http://localhost:5555/services/${id}`)
            .then((response) => {
              setRefresh(!refresh);
              setStatus('success');
              setNotification('Successfully deleted service!');
            })
            .catch((error) => {
              console.log(error.message);
              setStatus('danger');
              setNotification('Error deleting service!');
              setLoading(false);
            })
        })
        .catch((error) => {
          console.log(error.message);
          setStatus('danger');
          setNotification('Error deleting service!');
          setLoading(false);
        })
    } catch (error) {
      console.log(error.message);
    }
  };

  const addServiceSong = (serviceSongObj, isNewSong) => {
    console.log('added');
    console.log(serviceSongObj);
    
    // if isNewSong then check if it exists first and then create new singer song
    // then create the service song
    setLoading(true);
    if (isNewSong) {
      const singerSongObj = {
        singer: serviceSongObj.singer,
        author: serviceSongObj.author,
        song: serviceSongObj.song,
        key: serviceSongObj.key
      }
      try {
        axios
          .post('http://localhost:5555/singerSongs', singerSongObj)
          .then((response) => {
            axios
              .post('http://localhost:5555/serviceSongs', serviceSongObj)
              .then((response) => {
                // update the num songs on the service
                const serviceObj = {
                  date: serviceSelected.date,
                  worshipLeader: serviceSelected.worshipLeader,
                  numSongs: serviceSelected.numSongs + 1
                };
                axios
                  .put(`http://localhost:5555/services/${serviceSelected.id}`, serviceObj)
                  .then((response) => {
                    setRefresh(!refresh);
                    setStatus('success');
                    setNotification('Successfully created service song!');
                  })
                  .catch((error) => {
                    console.log(error.response.data.message);
                    setStatus('danger');
                    setNotification(error.response.data.message);
                    setLoading(false);
                  })
              })
              .catch((error) => {
                console.log(error.response.data.message);
                setStatus('danger');
                setNotification(error.response.data.message);
                setLoading(false);
              })
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setStatus('danger');
            setNotification(error.response.data.message);
            setLoading(false);
          })
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        axios
          .post('http://localhost:5555/serviceSongs', serviceSongObj)
          .then((response) => {
            // update the num songs on the service
            const serviceObj = {
              date: serviceSelected.date,
              worshipLeader: serviceSelected.worshipLeader,
              numSongs: serviceSelected.numSongs + 1
            };
            axios
              .put(`http://localhost:5555/services/${serviceSelected.id}`, serviceObj)
              .then((response) => {
                setRefresh(!refresh);
                setStatus('success');
                setNotification('Successfully created service song!');
              })
              .catch((error) => {
                console.log(error.response.data.message);
                setStatus('danger');
                setNotification(error.response.data.message);
                setLoading(false);
              })
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setStatus('danger');
            setNotification(error.response.data.message);
            setLoading(false);
          })
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const editServiceSong = (serviceSongObj, id) => {
    // route to edit service song
    setLoading(true);
    try {
      axios
        .put(`http://localhost:5555/serviceSongs/${id}`, serviceSongObj)
        .then((response) => {
          setRefresh(!refresh);
          setStatus('success');
          setNotification('Successfully updated service song!');
        })
        .catch((error) => {
          console.log(error.message);
          setStatus('danger');
          setNotification('Error updating service!');
          setLoading(false);
        })
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteServiceSong = (id) => {
    // route to delete service song
    setLoading(true);

    try {
      axios
        .delete(`http://localhost:5555/serviceSongs/${id}`)
        .then((response) => {
          // update the num songs on the service
          const serviceObj = {
            date: serviceSelected.date,
            worshipLeader: serviceSelected.worshipLeader,
            numSongs: serviceSelected.numSongs - 1
          }
          axios
            .put(`http://localhost:5555/services/${serviceSelected.id}`, serviceObj)
            .then((response) => {
              setRefresh(!refresh);
              setStatus('success');
              setNotification('Successfully deleted service song!');
            })
            .catch((error) => {
              console.log(error.message);
              setStatus('danger');
              setNotification('Error deleting service!');
              setLoading(false);
            })
        })
        .catch((error) => {
          console.log(error.message);
          setStatus('danger');
          setNotification('Error deleting service!');
          setLoading(false);
        })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div 
        className='App-body'
        initial= {{opacity: 0}}
        animate = {{opacity: 1}}
        transition={{duration: 0.5, ease: 'easeOut'}}
        exit={{opacity: 0}}
      >
        <div className='svntcog-main'>
          <h2>SVNTCOG App</h2>
          <Divider
            variant='middle'
            sx={{
              borderColor: blue2,
              width: '100%',
              borderWidth: '1px'
            }}
          >
          </Divider>
          <br></br>
          {loading ? (<CircularProgress size='md' className='spinner'/>) :
            (
              <div style={{width: '100%'}}>
                <FormLabel sx={{color: 'white'}}>Search songs</FormLabel>
                <SearchBar type='songList' editValue={{}} options={songs} onOptionClick={displaySongLyrics} disabled={false}/>
                <br></br>
                <Stack spacing={1} alignItems='center' direction='column'>
                  {/* component to display the planned services */}
                  <CustomDataGrid
                    id="ServiceTable"
                    columns={serviceColumns}
                    rows={services}
                    onRowClick={displayServiceSongs}
                  />
                  <ButtonGroup variant='solid' spacing='0.5rem'>
                    <AddEditService
                      onCreate={addService}
                      onUpdate={editService}
                      info={serviceSelected}
                    />
                    <DeleteService
                      onDelete={deleteService}
                      info={serviceSelected}
                    />
                  </ButtonGroup>

                  {/* component to display the planned services */}
                  <Collapse in={showSongsTable} style={{width: '100%'}}>
                    <Stack spacing={1} alignItems='center' direction='column'>
                      <CustomDataGrid
                        id="SongTable"
                        columns={songsColumns}
                        rows={serviceSongs}
                        onRowClick={selectServiceSong}
                      />
                      <ButtonGroup variant='solid' spacing='0.5rem'>
                        <AddEditServiceSong
                          onCreate={addServiceSong}
                          onUpdate={editServiceSong}
                          info={{selectedService: serviceSelected, selectedSong: serviceSongSelected, singerSongs: singerSongs, songs: songs, editValue: editValue}}
                        />
                        <DeleteServiceSong
                          onDelete={deleteServiceSong}
                          info={serviceSongSelected}
                        />
                      </ButtonGroup>
                    </Stack>
                  </Collapse>
                </Stack>

                <InfoModal
                  info={info}
                  setInfo={(info) => {setInfo(info)}}
                />

                {/* div for notifications */}
                <ClickAwayListener
                  onClickAway={() => {
                    if (notification !== '') {
                      setNotification('');
                    }
                  }}
                >
                  <animated.div
                    className='notification'
                    style={{ ...spring}}
                  >
                    <Box>
                      <Alert
                        variant="solid"
                        size='sm'
                        color={status}
                        startDecorator={<Info />}
                        endDecorator={
                          <IconButton
                            variant="plain"
                            size="sm"
                            onClick={() => {
                              setNotification('');
                            }}
                            sx={{
                              color: 'white'
                            }}
                          >
                            <CloseRounded />
                          </IconButton>
                        }
                      >
                        {notification}
                      </Alert>
                    </Box>
                  </animated.div>
                </ClickAwayListener>
              </div>
            )
          }
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SVNTCOG;