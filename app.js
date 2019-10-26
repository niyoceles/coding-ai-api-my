import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
// express app
const app = express();

// body parse configuration
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(router);

// Error handling to catch 404
app.use((_req, _res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// no stacktraces leaked to user
app.use((error, res) => {
  if (error) {
    return res.status(error.status || 500);
  }

  return res.json({
    errors: {
      message: error.message,
      error: {}
    }
  });
});

//Starting server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${server.address().port}`);
});

export default app;
