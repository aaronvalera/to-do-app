(async () => {
  // Verification logic here
  const token = window.location.pathname.split("/")[2];
  //   console.log('Token:', token);
  const { data } = await axios.patch("/api/users", { token });
  console.log("Verification response:", data);
})();
