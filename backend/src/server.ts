import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.sddt0k4.mongodb.net/?retryWrites=true&w=majority`;
// Connect to MongoDB
mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions // Type assertion here
);

const db = mongoose.connection;

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/')

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use('/api/users', userRoutes);

// Listen for the SIGINT signal and close the connection
process.on('SIGINT', () => {
    db.close(() => {
      console.log('MongoDB connection disconnected through app termination');
      process.exit(0);
    });
  });