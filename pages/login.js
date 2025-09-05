'use client';
import Layout from '../components/Layout';
import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';

export default function Login(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState('');
  async function login(e){ e.preventDefault(); try{ await signInWithEmailAndPassword(auth,email,pass); alert('Logged in'); } catch(err){ alert('Login error: '+ err.message); } }
  async function register(e){ e.preventDefault(); try{ await createUserWithEmailAndPassword(auth,email,pass); alert('Registered'); } catch(err){ alert('Register error: '+err.message); } }
  async function google(){ try{ const provider=new GoogleAuthProvider(); await signInWithPopup(auth,provider); alert('Signed in with Google'); } catch(err){ alert('Google login error: '+err.message); } }
  async function forgot(){ if(!email) return alert('Enter email to reset'); try{ await sendPasswordResetEmail(auth,email); alert('Reset email sent'); } catch(e){ alert('Error: '+ (e.message || e)); } }
  return (<Layout><h1>Login / Register</h1><form onSubmit={login}><label>Email</label><br/><input value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:'100%',padding:8}}/><br/><br/><label>Password</label><br/><input type='password' value={pass} onChange={(e)=>setPass(e.target.value)} style={{width:'100%',padding:8}}/><br/><br/><div style={{display:'flex',gap:8}}><button className='btn' type='submit'>Login</button><button className='btn' type='button' onClick={register}>Register</button></div></form><hr style={{margin:'18px 0'}}/><button className='btn' onClick={google}>Continue with Google</button><button className='btn outline' onClick={forgot} style={{marginLeft:12}}>Forgot Password</button></Layout>);
}