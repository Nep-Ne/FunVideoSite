import express from 'express';
import Video from '../models/videoModel';
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


router.get('/seed', async (req, res) => {//cái này phải được đặt trước router.get('/:id',async ....) vì nếu để sau thì nó sẽ hiểu lầm seed là giá trị của id khi sử dụng phương thức get!!!!!
  try {
    const video = new Video({
    title: "Daughter's life",
    author:"Hieu",
    path: '/videos/278292100_3228275064164609_660334344567576185_n.mp4',
    });
    const newVideo = await video.save();
    res.send(newVideo);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;