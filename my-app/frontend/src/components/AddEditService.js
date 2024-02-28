import * as React from 'react';
import dayjs from 'dayjs';
import { Stack, Modal, ModalClose, Typography, Sheet, Input, Button } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddEditService(props) {
  const open = props.isOpen;
  const edit = props.isEdit;
  const info = props.info;
  
  const [date, setDate] = React.useState(dayjs('01-01-2024'));
  const [worshipLeader, setWorshipLeader] = React.useState('');

  React.useEffect(() => {
    if (edit) {
      setDate(dayjs(info.date));
      setWorshipLeader(info.worshipLeader);
    }
  }, [edit, info.date, info.worshipLeader]);

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => props.setIsOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            width: '85%',
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
              
              props.setIsOpen(false);
            }}
          >
            <Stack spacing={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id='add-edit-date-picker'
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                />
              </LocalizationProvider>
              <Input 
                id='add-edit-textfield'
                placeholder='Worship Leader...'
                value={worshipLeader}
                onChange={(newValue) => setWorshipLeader(newValue.target.value)}
              />
              <Button type='submit'>
                { edit ? 'Update': 'Create'}
              </Button>
            </Stack>
          </form>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}

export default AddEditService;