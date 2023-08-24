import React from 'react';
import { Modal, Typography, Button } from '@mui/material';

export default function NewContactModal({ closeModal }) {
  return (
    <Modal open onClose={closeModal}>
      <div style={{ background: 'white', padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
          Create Contact
        </Typography>
        {/* Add your form or content here */}
        <Button variant="contained" onClick={closeModal}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
