import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSpringRef, animated, useSpring, useTransition } from '@react-spring/web';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import CircularProgress from '@mui/joy/CircularProgress';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import CustomDataGrid from '../components/CustomDataGrid';
import InfoModal from '../components/InfoModal';
import AddEditService from '../components/AddEditService';
import DeleteService from '../components/DeleteService';
import AddEditServiceSong from '../components/AddEditServiceSong';
import DeleteServiceSong from '../components/DeleteServiceSong';
import Info from '@mui/icons-material/Info';
import CloseRounded from '@mui/icons-material/CloseRounded';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import dayjs from 'dayjs';
import SwapHorizRounded from '@mui/icons-material/SwapHorizRounded';
import FileDownload from '@mui/icons-material/FileDownload';
import PDFFile from '../components/PDFFile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Typography from '@mui/joy/Typography';
import SongSearchBar from '../components/SongSearchBar';
import SingerSongSearchBar from '../components/SingerSongSearchBar';

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
  const [showSongs, setShowSongs] = useState(true);
  const [status, setStatus] = useState('neutral');
  const [songs, setSongs] = useState([]);
  const [singerSongs, setSingerSongs] = useState([]);
  const [singers, setSingers] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceSongs, setServiceSongs] = useState([]);
  const [info, setInfo] = useState({title: '', desc: ''});
  const [loading, setLoading] = useState(false);
  const [serviceSelected, setServiceSelected] = useState({});
  const [serviceSongSelected, setServiceSongSelected] = useState({});
  const [editValue, setEditValue] = useState({});
  const [notification, setNotification] = useState('');

  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
  const orange = getComputedStyle(document.body).getPropertyValue('--orange2');

  const serviceColumns = [
    { field: 'date', headerName: 'Date', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'worshipLeader', headerName: 'Worship Leader', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'numSongs', headerName: 'Songs', flex: 1, headerAlign: 'center', align: 'center'}
  ];
  const serviceVisibilityColumns = {
    date: true,
    worshipLeader: true,
    numSongs: true
  }

  const songsColumns = [
    { field: 'song', headerName: 'Song', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'singer', headerName: 'Singer', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'author', headerName: 'Author', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'key', headerName: 'Key', flex: 1, headerAlign: 'center', align: 'center'}
  ];
  const songsVisibilityColumns = {
    song: true,
    singer: true,
    author: false,
    key: true
  }

  const springRef = useSpringRef();
  const spring = useSpring({
    from: notification !== '' ? { opacity: 0, y: 0 } : { opacity: 1, y: 10 },
    to: notification !== '' ? { opacity: 1, y: 10 } : { opacity: 0, y: 0 },
    ref: springRef,
    config: {
      duration: 150,
    },
  });

  const transRef = useSpringRef();
  const trans = useTransition(showSongs, {
    from: {opacity: 0, x: showSongs ? 10 : -10},
    enter: [{opacity: 1, x: showSongs ? -5 : 5 }, {opacity: 1, x: 0}],
    leave: {opacity: 0, x: showSongs ? -15 : 15},
    ref: transRef,
    keys: null,
    exitBeforeEnter: true,
    config: {
      duration: 350,
    }
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

        // call to route to get singers
        axios
          .get('http://localhost:5555/singer')
          .then((response) => {
            setSingers(response.data.data);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          })

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
        await sleep(0.25e3);
      }
      springRef.start();
    })();
    
  }, [notification, springRef]);

  useEffect(() => {
    transRef.start();
  }, [transRef, showSongs]);

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

  const addService = (serviceObj, isNewSinger) => {
    // route to add service
    setLoading(true);
    try {
      if (isNewSinger) {
        const singerObj = {
          name: serviceObj.worshipLeader
        };

        axios
          .post('http://localhost:5555/singer', singerObj)
          .then((response) => {
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
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setStatus('danger');
            setNotification(error.response.data.message);
            setLoading(false);
          })
      } else {
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editService = (serviceObj, id, isNewSinger) => {
    //route to edit service
    setLoading(true);
    try {
      if (isNewSinger) {
        const singerObj = {
          name: serviceObj.worshipLeader
        };

        axios
          .post('http://localhost:5555/singer', singerObj)
          .then((response) => {
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
          })
          .catch((error) => {
            console.log(error.message);
            setStatus('danger');
            setNotification('Error updating service!');
            setLoading(false);
          })
      } else {
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
      }
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

  const addServiceSong = (serviceSongObj, isNewSong, isNewSinger, isPreferred) => {
    // if isNewSong then check if it exists first and then create new singer song
    // then create the service song
    setLoading(true);

    // check if serviceSongObj is valid
    if (serviceSongObj.singer === '' ||
        serviceSongObj.author === '' ||
        serviceSongObj.song === '' ||
        serviceSongObj.key === '') {
          setStatus('danger');
          setNotification('Must use all required fields: singer, song and key!');
          setLoading(false);
          return;
    }

    // check if there serviceSongObj already exists
    for (const song of serviceSongs) {
      if (song.song === serviceSongObj.song &&
          song.author === serviceSongObj.author &&
          song.singer === serviceSongObj.singer &&
          song.key === serviceSongObj.key) {
            setStatus('danger');
            setNotification('Duplicate service songs are not allowed!');
            setLoading(false);
            return;
          }
    }

    if (isNewSong) {
      const singerSongObj = {
        singer: serviceSongObj.singer,
        author: serviceSongObj.author,
        song: serviceSongObj.song,
        key: serviceSongObj.key,
        preferred: isPreferred
      }
      
      try {
        // add new singer to the singers list
        if (isNewSinger) {
          const singerObj = {
            name: serviceSongObj.singer
          };

          axios
            .post('http://localhost:5555/singer', singerObj)
            .then((response) => {
              axios
                .post('http://localhost:5555/singerSongs', singerSongObj)
                .then((response) => {
                  axios
                    .post('http://localhost:5555/serviceSongs', serviceSongObj)
                    .then((response) => {
                      // update the num songs on the service
                      const serviceObj = {
                        date: dayjs(serviceSelected.date).$d,
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
            })
            .catch((error) => {
              console.log(error.response.data.message);
              setStatus('danger');
              setNotification(error.response.data.message);
              setLoading(false);
            })
        } else {
          axios
            .post('http://localhost:5555/singerSongs', singerSongObj)
            .then((response) => {
              axios
                .post('http://localhost:5555/serviceSongs', serviceSongObj)
                .then((response) => {
                  // update the num songs on the service
                  const serviceObj = {
                    date: dayjs(serviceSelected.date).$d,
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
        }
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
              date: dayjs(serviceSelected.date).$d,
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

  const editServiceSong = (serviceSongObj, id, isPreferred) => {
    // route to edit service song
    setLoading(true);
    try {
      let oldId = '';
      let oldSingerSongObj = {};
      let newId = '';
      let newSingerSongObj = {};

      let oldPreferredArr = singerSongs.filter((song) => song.song === serviceSongObj.song &&
                                                  song.author === serviceSongObj.author &&
                                                  song.singer === serviceSongObj.singer &&
                                                  song.key !== serviceSongObj.key &&
                                                  song.preferred === true);
          
      let newPreferredArr = singerSongs.filter((song) =>  song.song === serviceSongObj.song &&
                                                  song.author === serviceSongObj.author &&
                                                  song.singer === serviceSongObj.singer &&
                                                  song.key === serviceSongObj.key);
      // should only be 1 element in array
      // change the old preferred key song to a non-preferred key song
      if (oldPreferredArr.length !== 0) {
        oldId = oldPreferredArr[0].id;
        oldSingerSongObj.singer = oldPreferredArr[0].singer;
        oldSingerSongObj.author = oldPreferredArr[0].author;
        oldSingerSongObj.song = oldPreferredArr[0].song;
        oldSingerSongObj.key = oldPreferredArr[0].key;
        oldSingerSongObj.preferred = false;
      }

      // should only be 1 element in array
      // get id of service song to update the preferred field (no matter if it is true or false)
      if (newPreferredArr.length !== 0) {
        newId = newPreferredArr[0].id;
        newSingerSongObj.singer = newPreferredArr[0].singer;
        newSingerSongObj.author = newPreferredArr[0].author;
        newSingerSongObj.song = newPreferredArr[0].song;
        newSingerSongObj.key = newPreferredArr[0].key;
        newSingerSongObj.preferred = isPreferred;
      }
      
      axios
        .put(`http://localhost:5555/serviceSongs/${id}`, serviceSongObj)
        .then((response) => {
          // update the newly set preferred key singer song
          // safety check
          if (newId !== '') {
            axios
              .put(`http://localhost:5555/singerSongs/${newId}`, newSingerSongObj)
              .catch((error) => {
                console.log(error.message);
                  setStatus('danger');
                  setNotification('Error updating service!');
                  setLoading(false);
              })
          }
          
          // update the old preferred key singer song if necessary
          // safety check
          if (oldId !== '') {
            axios
              .put(`http://localhost:5555/singerSongs/${oldId}`, oldSingerSongObj)
              .catch((error) => {
                console.log(error.message);
                setStatus('danger');
                setNotification('Error updating service!');
                setLoading(false);
              })
          }

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
  };

  const handleExportResult = (status, notification) => {
    setStatus(status);
    setNotification(notification);
  };

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
                <Stack spacing={1} direction='row' alignItems='flex-end'>
                  {/* transition to switch between the two search bars */}
                  {trans((style, item) => (
                    <animated.div style={{...style, width: '100%'}}>
                      {item ? (
                        <Stack spacing={1} direction='column' alignItems='flex-start' sx={{flex: 1}}>
                          <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: '10pt', }}>Search songs</Typography>
                          <SongSearchBar 
                            options={songs}
                            editValue={{}}
                            onOptionClick={displaySongLyrics}
                            disabled={false}
                          />
                        </Stack>
                      ) : (
                        <Stack spacing={1} direction='column' alignItems='flex-start' sx={{flex: 1}}>
                          <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: '10pt', }}>Search singer songs</Typography>
                          <SingerSongSearchBar
                            editValue={{}}
                            options={singerSongs}
                            onOptionClick={()=>{}}
                            disabled={false}
                          />
                        </Stack>
                      )}
                    </animated.div>
                  ))}
                  
                  <IconButton
                    variant='solid'
                    color='primary'
                    size='md'
                    onClick={() => {setShowSongs(!showSongs)}}
                  >
                    <SwapHorizRounded />
                  </IconButton>
                </Stack>
                
                <br></br>
                <Stack spacing={1} alignItems='center' direction='column'>
                  {/* component to display the planned services */}
                  <CustomDataGrid
                    id="ServiceTable"
                    columns={serviceColumns}
                    rows={services}
                    onRowClick={displayServiceSongs}
                    visibleColumns={serviceVisibilityColumns}
                  />
                  <ButtonGroup variant='solid' spacing='0.5rem'>
                    <AddEditService
                      onCreate={addService}
                      onUpdate={editService}
                      info={{serviceSelected: serviceSelected, singers: singers}}
                    />
                    <DeleteService
                      onDelete={deleteService}
                      info={serviceSelected}
                    />

                    {/* export/download pdf file button */}
                    <Collapse in={Object.keys(serviceSelected).length !== 0 ? true : false} orientation='horizontal'>
                      <PDFDownloadLink
                        document={<PDFFile data={{service: serviceSelected, songs: songs}} handleRenderResult={handleExportResult}/>}
                        fileName={serviceSelected.date + '-' + serviceSelected.worshipLeader + '-service'}
                      >
                        {({loading}) => (loading ? 
                          <IconButton disabled={true}>
                            <CircularProgress />
                          </IconButton> : 
                          <IconButton
                            sx={{
                              backgroundColor: orange
                            }}
                          >
                            <FileDownload />
                          </IconButton>
                        )}
                      </PDFDownloadLink>
                    </Collapse>
                  </ButtonGroup>

                  {/* component to display the planned services */}
                  <Collapse in={showSongsTable} style={{width: '100%'}}>
                    <Stack spacing={1} alignItems='center' direction='column'>
                      <CustomDataGrid
                        id="SongTable"
                        columns={songsColumns}
                        rows={serviceSongs}
                        onRowClick={selectServiceSong}
                        visibleColumns={songsVisibilityColumns}
                      />
                      <ButtonGroup variant='solid' spacing='0.5rem'>
                        <AddEditServiceSong
                          onCreate={addServiceSong}
                          onUpdate={editServiceSong}
                          info={{selectedService: serviceSelected, selectedSong: serviceSongSelected, singerSongs: singerSongs, songs: songs, singers: singers, editValue: editValue}}
                        />
                        <DeleteServiceSong
                          onDelete={deleteServiceSong}
                          info={serviceSongSelected}
                        />
                      </ButtonGroup>
                    </Stack>
                  </Collapse>
                </Stack>
                
                {/* modal to display info/lyrics */}
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