import * as React from 'react';
import { Stack, Modal, ModalClose, Typography, Button, ModalDialog } from '@mui/joy';
import { Transition } from 'react-transition-group';
import { Remove } from '@mui/icons-material';

function DeleteService(props) {
  const info = props.info;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        size='sm'
        startDecorator={<Remove />}
        onClick={() => {
          setOpen(true);
        }}
        disabled={ Object.keys(info).length === 0 ? true : false }
      >
        Delete
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
                Delete Service
              </Typography>
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  // const serviceObj = {
                  //   date: date.$d,
                  //   worshipLeader: worshipLeader,
                  // };

                  // if (!edit) {
                  //   props.onCreate(serviceObj);
                  // } else {
                  //   serviceObj.numSongs = info.numSongs;
                  //   props.onUpdate(serviceObj, info.id);
                  // }
                  
                  setOpen(false);
                }}
              >
                <Stack spacing={1}>
                  <Typography id="modal-desc-1" textColor="text.tertiary">
                    Date: <code>{info.date}</code>
                  </Typography>
                  <Typography id="modal-desc-2" textColor="text.tertiary">
                    Worship Leader: <code>{info.worshipLeader}</code>
                  </Typography>
                  <Typography id="modal-desc-3" textColor="text.tertiary">
                    Are you sure you want to delete this service?
                  </Typography>
                  <Button type='submit' color='primary'>
                    Delete
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

export default DeleteService;