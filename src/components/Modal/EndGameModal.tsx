import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useGameStateContext } from '../../context/Context';
import styling from './EndGameModal.module.css';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#d9c9b4',
  border: '10px solid #735236',
  borderRadius: '20px',
  outline: '0',
  outlineStyle: 'ridge',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const EndGameModal = (props: { openModal: boolean; closeModal: () => void }) => {
  const handleClose = () => props.closeModal();
  const { points } = useGameStateContext();

  return (
    <>
      <div>
        <Modal
          open={props.openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styling.modalTitle}>Game has ended!</div>
            <p className={styling.modalDescription}>
              You can not place any more tiles. <br />
              Your final score was:
            </p>
            <div className={styling.finalPoints}>{points * 100}</div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
