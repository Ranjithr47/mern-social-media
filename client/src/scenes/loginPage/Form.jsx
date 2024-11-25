const register = async (values, onSubmitProps) => {
  // this allows us to send form info with image
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append("picturePath", values.picture.name);

  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      body: formData,
    }
  );
  const savedUser = await savedUserResponse.json();
  onSubmitProps.resetForm();

  if (savedUser) {
    setPageType("login");
  }
};

const login = async (values, onSubmitProps) => {
  const loggedInResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const loggedIn = await loggedInResponse.json();
  onSubmitProps.resetForm();
  if (loggedIn) {
    dispatch(
      setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      })
    );
    navigate("/home");
  }
};
