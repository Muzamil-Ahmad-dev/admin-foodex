 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) return;

  try {
    if (isAdmin) {
      const result = await dispatch(adminLoginThunk({ email, password })).unwrap();
      if (result.role === "admin") navigate("/admin/dashboard");
    } else {
      const result = await dispatch(userLoginThunk({ email, password })).unwrap();
      if (result.role === "user") navigate("/orders");
    }
  } catch (err) {
    console.error("Login failed:", err);
  }
};
