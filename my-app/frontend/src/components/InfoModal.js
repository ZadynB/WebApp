import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

function InfoModal(props) {
  const open = props.isOpen;
  const title = props.info.title;
  const desc = props.info.desc;

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
            height: '80%',
            overflow: 'auto'
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
            {title}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary" style={{whiteSpace: 'pre-line', fontSize: '10pt'}}>
            {desc}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default InfoModal;