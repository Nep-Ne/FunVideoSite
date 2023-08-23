import express from 'express';
import Video from '../models/videoModel';
import User from '../models/userModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  //   const category = req.query.category ? { category: req.query.category } : {};
  //   const searchKeyword = req.query.searchKeyword
  //     ? {
  //         name: {
  //           $regex: req.query.searchKeyword,
  //           $options: 'i',
  //         },
  //       }
  //     : {};
  //   const sortOrder = req.query.sortOrder
  //     ? req.query.sortOrder === 'lowest'
  //       ? { price: 1 }
  //       : { price: -1 }
  //     : { _id: -1 };
  const videos = await Video.find()
    //   .sort(sortOrder)
    ;
  res.send(videos);
});


router.get('/:id', async (req, res) => {
  const video = await Video.findOne({ _id: req.params.id });
  if (video) {
    res.send(video);
  } else {
    res.status(404).send({ message: 'Video Not Found.' });
  }
});

router.get('/author/:id', async (req, res) => {
  const user = await User.findOne({_id: req.params.id});
  // console.log(user);
  const videos = await Video.find({ author: user.name });
  const Allvideos = await Video.find();
  if(user.name == "Admin")
  {
    if (Allvideos) {
      res.send(Allvideos);
    } else {
      res.status(404).send({ message: 'Video Not Found.' });
    }
  }
  else
  {
    if (videos) {
      res.send(videos);
    } else {
      res.status(404).send({ message: 'Video Not Found.' });
    }

  }
  
});

router.get('/seed', async (req, res) => {//cái này phải được đặt trước router.get('/:id',async ....) vì nếu để sau thì nó sẽ hiểu lầm seed là giá trị của id khi sử dụng phương thức get!!!!!
  try {
    const video = new Video({
      title: "Daughter's life",
      author: "Hieu",
      pathvideo: '/videos/278292100_3228275064164609_660334344567576185_n.mp4',
    });
    const newVideo = await video.save();
    res.send(newVideo);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.put('/:id', isAuth,  async (req, res) => {
  const videoId = req.params.id;//req.params tương ứng phần trên thanh url
  const video = await Video.findById(videoId);
  if (video) {
    video.title = req.body.title;//req.body tương ứng phần nội dung form  !!!
    video.author = req.body.author;
    video.pathvideo = req.body.pathvideo;
    const updatedVideo = await video.save();
    if (updatedVideo) {
      return res
        .status(200)
        .send({ message: 'Video Updated', data: updatedVideo });
    }
  }

})

router.delete('/:id', isAuth, async (req, res) => {
  const videoId = req.params.id;
  const deletedVideo = await Video.findById(videoId);
  if (deletedVideo) {
    await deletedVideo.remove();
    return res
      .send({ message: 'Video deleted' })

  }
  else return res.send('Error in deletion');

})

router.post('/', isAuth,  async (req, res) => {
  try {
  const video = new Video(
    {
      title: req.body.title,
      author: req.body.author,
      pathvideo: req.body.pathvideo

    });
  const newVideo = await video.save();
  res.send({message:'New video created.',data:newVideo});
} catch (error) {
  res.send({ message: error.message });
}

  


}
)

export default router;