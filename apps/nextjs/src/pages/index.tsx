import { UserButton, useAuth } from '@clerk/nextjs';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import type { inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from '@yu/api';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import TaskList from '../components/task/TaskList';
import { api } from '../utils/api';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Yu Template</title>
        <meta name='description' content='Generated by t3-yu-stack' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main>
        <AppBar component='nav' position='static'>
          <Toolbar>
            <Stack
              direction='row'
              alignItems='center'
              width='100%'
              justifyContent='space-between'
            >
              <Stack direction='row' alignItems='center' gap={1}>
                <ChecklistIcon />
                <Typography variant='h5'>TO-DO LIST</Typography>
              </Stack>
              <Box />
              <AuthShowcase />
            </Stack>
          </Toolbar>
        </AppBar>
        <Container maxWidth='md'>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            mt={4}
          >
            <TaskList />
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!isSignedIn },
  );

  return (
    <>
      {isSignedIn && (
        <Stack direction='row' alignItems='center' gap={2}>
          <Typography>{secretMessage} click the user button!</Typography>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: '3rem',
                  height: '3rem',
                },
              },
            }}
          />
        </Stack>
      )}
      {!isSignedIn && (
        <MuiLink component={Link} href='/sign-in'>
          <Button
            sx={{ width: '200px', fontWeight: 'bold' }}
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        </MuiLink>
      )}
    </>
  );
};
