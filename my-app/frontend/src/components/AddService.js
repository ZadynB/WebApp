import * as React from 'react';
import dayjs from 'dayjs';
// import Modal from '@mui/joy/Modal';
// import ModalClose from '@mui/joy/ModalClose';
// import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';
import { Stack, Modal, ModalClose, Typography, Sheet, Input, Button } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddService(props) {
  const open = props.isOpen
  const [date, setDate] = React.useState(dayjs('01-01-2024'));
  const [worshipLeader, setWorshipLeader] = React.useState('');

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
            Add Service
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              // extracting date
              let dateStr = date.$y;
              if (date.$M + 1 < 10) {
                dateStr = dateStr + '-0' + (date.$M + 1);
              } else {
                dateStr = dateStr + '-' + (date.$M + 1);
              }

              if (date.$D < 10) {
                dateStr = dateStr + '-0' + date.$D;
              } else {
                dateStr = dateStr + '-' + date.$D;
              }
              let newDate = new Date(dateStr);

              const serviceObj = {
                date: newDate,
                worshipLeader: worshipLeader,
                numSongs: 0
              };
              props.onSubmit(serviceObj);
              props.setIsOpen(false);
            }}
          >
            <Stack spacing={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                />
              </LocalizationProvider>
              <Input 
                placeholder='Worship Leader...'
                value={worshipLeader}
                onChange={(newValue) => setWorshipLeader(newValue.target.value)}
              />
              <Button type='submit'>Create</Button>
            </Stack>
          </form>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}

export default AddService;