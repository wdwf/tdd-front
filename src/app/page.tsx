"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, useState } from "react";

const user = {
  email: "testeInvalido@email.com",
  password: "senhaInvalida",
};

export default function Home() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setMessage("");

      if (!inputEmail || !inputPassword) {
        throw new Error("E-mail e senha são obrigatórios!");
      }

      if (inputEmail !== user.email || inputPassword !== user.password) {
        throw new Error("E-mail e senha inválidos!");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  }

  return (
    <div>
      <div>
        <h1>LOGIN</h1>
      </div>
      <main className={styles.main}>
        <h2>Welcome</h2>
        <h3>Let&apos;s log you in quickly</h3>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter your email'
            value={inputEmail}
            onChange={(event) => setInputEmail(event.target.value)}
          />
          <input
            type='text'
            placeholder='Enter your password'
            value={inputPassword}
            onChange={(event) => setInputPassword(event.target.value)}
          />
          <button>Login</button>
        </form>
        {message && <strong>{message}</strong>}
      </main>
    </div>
  );
}

