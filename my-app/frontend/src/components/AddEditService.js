import * as React from 'react';
import dayjs from 'dayjs';
import { Stack, Modal, ModalClose, Typography, Input, Button, ModalDialog } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Transition } from 'react-transition-group';
import { Add, Edit } from '@mui/icons-material';

function AddEditService(props) {
  const info = props.info;

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [date, setDate] = React.useState(dayjs('01-01-2024'));
  const [worshipLeader, setWorshipLeader] = React.useState('');

  const orange = getComputedStyle(document.body).getPropertyValue('--orange2');

  React.useEffect(() => {
    if (edit) {
      setDate(dayjs(info.date));
      setWorshipLeader(info.worshipLeader);
    }
  }, [edit, info.date, info.worshipLeader]);

  return (
    <React.Fragment>
      <Button
        size='sm'
        startDecorator={<Add />}
        onClick={() => {
          setEdit(false);
          setDate(dayjs('01-01-2024'));
          setWorshipLeader('');
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
        disabled={ Object.keys(info).length === 0 ? true : false }
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
                { edit ? 'Edit Service' : 'Add Service'}
              </Typography>
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const serviceObj = {
                    date: date.$d,
                    worshipLeader: worshipLeader,
                  };

                  if (!edit) {
                    props.onCreate(serviceObj);
                  } else {
                    serviceObj.numSongs = info.numSongs;
                    props.onUpdate(serviceObj, info.id);
                  }
                  
                  setOpen(false);
                }}
              >
                <Stack spacing={1}>
                  <Typography id="modal-field-1" textColor="text.tertiary">
                    Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id='add-edit-date-picker'
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                    />
                  </LocalizationProvider>
                  <Typography id="modal-field-2" textColor="text.tertiary">
                    Worship Leader
                  </Typography>
                  <Input 
                    id='add-edit-textfield'
                    placeholder='Worship Leader...'
                    value={worshipLeader}
                    onChange={(newValue) => setWorshipLeader(newValue.target.value)}
                  />
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

export default AddEditService;