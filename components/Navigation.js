'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
  
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {session && session.user.name}
          </Typography>
  
          {session ? (
            <Button color="inherit" onClick={() => signOut()}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => signIn()}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItem>
            <Link href="/" passHref>
              <Button color="inherit">Homepage</Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/position" passHref>
              <Button color="inherit">Positions</Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/structure" passHref>
              <Button color="inherit">Portfolio Structure</Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/yield" passHref>
              <Button color="inherit">Portfolio Yield</Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/finance" passHref>
              <Button color="inherit">Financial Activity</Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export { Navigation };