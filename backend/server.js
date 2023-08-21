import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import uploadRoute from "./routes/uploadRoute"
import videoRoute from "./routes/videoRoute"
import userRoute from "./routes/userRoute"
import config from './config';
import mongoose from 'mongoose';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
// app.use('/api/uploads',uploadRoute);//cái này ko ảnh hưởng đến việc lấy file trong folder uploads!!!!
// app.use('/api/users',userRoute);
app.use('/api/videos', videoRoute);

//thiếu phần uploads này thì sẽ ko đọc được file trong folder uploads !!!
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
//

app.listen(config.PORT, () => {
  console.log("serve at http://localhost:" + config.PORT);
});