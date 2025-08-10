import app from "./src/app";


const startServer = async () => {
  // Connect database


  const port =  3000;

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
