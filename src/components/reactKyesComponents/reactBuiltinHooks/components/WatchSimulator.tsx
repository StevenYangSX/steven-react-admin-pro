import { Divider } from "antd";
import React, { useEffect, useRef, useState } from "react";

const WatchSimulator = () => {
  const [username, setUsername] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [prevUsername, setPrevUsername] = useState<string | null>("");
  const [prevEmail, setPrevEmail] = useState<string | null>("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    return () => {
      setPrevUsername(username);
      setPrevEmail(email);
    };
  }, [username, email]);
  useEffect(() => {
    const handleChange = () => {
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const username = formData.get("username") as string;
      const email = formData.get("email") as string;
      setUsername(username);
      setEmail(email);
    };

    // Add event listeners to the form inputs
    const form = formRef.current;
    if (form) {
      form.addEventListener("input", handleChange);
    }

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      if (form) {
        form.removeEventListener("input", handleChange);
      }
    };
  }, []);

  return (
    <>
      <form action="submit" ref={formRef}>
        <label htmlFor="username">Username : </label>
        <input autoComplete="off" type="text" id="username" name="username" />
        <label htmlFor="email">email : </label>
        <input autoComplete="off" type="email" id="email" name="email" />
      </form>
      <Divider />
      <ul>
        <li>Watch form data username : {username}</li>
        <li>Watch form data email : {email}</li>
        <br />
        <li>Watch form data username previous : {prevUsername}</li>
        <li>Watch form data email previous : {prevEmail}</li>
      </ul>
    </>
  );
};

export default WatchSimulator;
