import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { register } from "../services/auth.service";
import { useState, useContext } from "react";
import Form from "../components/Form";

import { UserContext } from "../hooks/UserContext";
import {
  handleChange,
  handleEmailChange,
  handlePasswordChange,
} from "../utilities/handleChanges";

const SignUp = (props) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const data = [
    {
      type: "username",
      title: "Username",
      placeholder: "Enter your username",
      onChange: (value) => {
        handleChange(value, setUsername);
      },
      icon: faUser,
      error: "",
    },
    {
      type: "email",
      title: "Email",
      placeholder: "Enter your email",
      onChange: (value) => {
        handleEmailChange(value, setEmail, setErrors);
      },
      icon: faEnvelope,
      error: errors.email,
    },
    {
      type: "password",
      title: "Password",
      placeholder: "Enter your Password",
      onChange: (value) => {
        handlePasswordChange(value, setPassword, setErrors);
      },
      icon: faLock,
      error: errors.password,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errors.email !== "" || errors.password !== "") {
      return;
    }

    setLoading(true);
    const data = await register(username, email, password);
    setLoading(false);

    if (!data.success) {
      return setErrors((prev) => ({
        ...prev,
        form: data.message,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      form: "",
    }));

    setUser(data.user);
    props.history.push("/auction");
  };

  return (
    <Form
      title="Sign Up"
      data={data}
      onFormSubmit={handleSubmit}
      error={errors.form}
      loading={loading}
    />
  );
};

export default SignUp;
