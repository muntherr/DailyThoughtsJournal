import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { JournalEntry } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { addEntry, updateEntry } from "../services/firestore";

interface EntryDialogProps {
  open: boolean;
  entry: JournalEntry | null;
  onClose: () => void;
  onSave: () => void;
}

const EntryDialog: React.FC<EntryDialogProps> = ({
  open,
  entry,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
    } else {
      setTitle("");
      setBody("");
    }
    setError("");
  }, [entry, open]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!body.trim()) {
      setError("Content is required");
      return;
    }

    if (!currentUser) {
      setError("User not authenticated");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (entry) {
        // Update existing entry
        await updateEntry(entry.id, {
          title: title.trim(),
          body: body.trim(),
        });
      } else {
        // Create new entry
        await addEntry({
          uid: currentUser.uid,
          title: title.trim(),
          body: body.trim(),
          createdAt: new Date(),
        });
      }

      onSave();
    } catch (error: any) {
      setError("Failed to save entry: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{entry ? "Edit Entry" : "New Journal Entry"}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="normal"
            label="Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
            placeholder="What's on your mind today?"
          />
          <TextField
            margin="normal"
            label="Content"
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={saving}
            placeholder="Write your thoughts here..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntryDialog;
