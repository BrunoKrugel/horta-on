import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button, TextField, Paper, Alert } from '@mui/material';
import clientPromise from '../lib/mongodb';
import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  const username = e.target.user.value;
  const password = e.target.password.value;
  try {
    await axios.post(`${window.location.origin}/api/auth/login`, {
      username,
      password,
    });
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('username', username);
  } catch (error) {
    localStorage.setItem('isLogged', '');
  }
};

const createUser = async (e) => {
  console.log('oi');
};

export default function Home({ isConnected }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard Weather</title>
        <meta name="description" content="Dashboard Weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <Paper className={styles.card} elevation={3}>
            {isConnected ? (
              <Alert severity="success">DB connected!</Alert>
            ) : (
              <Alert severity="error">DB not connected!</Alert>
            )}
            <TextField id="user" label="User" variant="outlined" />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
            />
            <div>
              <Button type="submit" variant="contained">
                Login
              </Button>
              <Link href="/auth/createUser" passHref>
                <Button variant="outlined">Sign in</Button>
              </Link>
            </div>
          </Paper>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}