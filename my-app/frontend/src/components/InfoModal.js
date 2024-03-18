import * as React from 'react';
import { Modal, ModalClose, Typography, ModalDialog } from '@mui/joy';
import { Transition } from 'react-transition-group';

function AddEditService(props) {
  const title = props.info.title;
  const desc = props.info.desc;
  const view_width = window.innerWidth;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (title !== '' && desc !== '') {
      setOpen(true);
    }
  }, [title, desc, open]);

  return (
    <React.Fragment>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={!['exited', 'exiting'].includes(state)}
            onClose={() => {
              props.setInfo({ title: '', desc: '' });
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
                width: '85%',
                height: '80%',
                overflow: 'auto',
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
                style={{whiteSpace: 'pre-line'}}
              >
                {title}
              </Typography>
              <Typography id="modal-desc" textColor="text.tertiary" style={{whiteSpace: 'pre-line', fontSize: view_width > 916 ? '15pt' : '10pt'}}>
                {desc}
              </Typography>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}

export default AddEditService;