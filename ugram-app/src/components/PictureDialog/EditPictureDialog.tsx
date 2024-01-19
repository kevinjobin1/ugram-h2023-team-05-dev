import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { updatePost } from '../../services/post.service';

type EditPictureProps = {
  pictureId?: string;
  description?: string;
  onEdit?: () => any;
  open: boolean;
  onClose: () => any;
};

export default function EditPictureDialog(props: EditPictureProps) {
  const [description, setDescription] = useState(props.description);

  useEffect(() => {
    setDescription(props.description);
  }, [props.description]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const handleSubmit = () => {
    if (props.pictureId) {
      updatePost(props.pictureId, {
        description: description ?? '',
      }).then(() => {
        if (props.onEdit) props.onEdit();
        props.onClose();
      });
    }
  };

  return (
    <Dialog fullWidth={true} open={props.open} onClose={props.onClose}>
      <DialogTitle sx={{ alignSelf: 'center' }}>Change the description</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            id="add-description"
            placeholder="Add a description"
            value={description}
            onChange={handleDescriptionChange}
            sx={{ margin: '5px 0px' }}
            multiline
            rows={3}
          ></TextField>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ textTransform: 'none', fontSize: '16px' }}
          >
            Send
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
