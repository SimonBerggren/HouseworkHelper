import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1/hwhdb';

const options: mongoose.ConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
};

const connect = () => mongoose.connect(connectionString, options)
    .catch((error) => {
        throw `Could not connect to MongoDB: ${error.message}`;
    });

export default connect;