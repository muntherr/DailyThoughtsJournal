import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { JournalEntry } from "../types";
import EntryCard from "./EntryCard";
import EntryDialog from "./EntryDialog";
import { getEntries } from "../services/firestore";

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadEntries();
    }
  }, [currentUser]);

  const loadEntries = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      console.log("Loading entries for user:", currentUser.uid);
      const userEntries = await getEntries(currentUser.uid);
      console.log("Loaded entries:", userEntries);
      setEntries(userEntries);
    } catch (error) {
      console.error("Error loading entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAddEntry = () => {
    setEditingEntry(null);
    setDialogOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEntry(null);
  };

  const handleSaveEntry = () => {
    loadEntries();
    handleCloseDialog();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Daily Thoughts
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {currentUser?.email}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            My Journal
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddEntry}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            New Entry
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : entries.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No entries yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start writing your first journal entry!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddEntry}
            >
              Create First Entry
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {entries.map((entry) => (
              <Grid item xs={12} sm={6} md={4} key={entry.id}>
                <EntryCard
                  entry={entry}
                  onEdit={handleEditEntry}
                  onDelete={loadEntries}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button for mobile */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            display: { xs: "flex", sm: "none" },
          }}
          onClick={handleAddEntry}
        >
          <AddIcon />
        </Fab>
      </Container>

      <EntryDialog
        open={dialogOpen}
        entry={editingEntry}
        onClose={handleCloseDialog}
        onSave={handleSaveEntry}
      />
    </>
  );
};

export default Dashboard;
