import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  console.log('mongodb : ',process.env.MONGODB_URI)

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://cahyos493:eYFHHRA2oVuFpZ35@cluster0.ygrg4ug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      dbName: "share_prompt"
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}