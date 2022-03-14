import React from 'react'

import Button from '../../../components/Button';
import AccountTrigger from './accountTrigger';

const AccountButtons = () => {
  return (
    <>
    <Button
        component="link"
        variant="outlined"
        to="/sign-in"
    >
        Login
    </Button>
    <Button
        component="link"
        variant="contained"
        to="/create-account"
    >
        Sign Up
    </Button>
    <AccountTrigger />
    </>
  )
}

export default AccountButtons;