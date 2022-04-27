/*
 * @Author: FunJust
 * @Date: 2022-04-26 20:53:13
 * @Description: 
 */
import express, {Express, Router, Request, Response} from 'express';
import axios from 'axios';

const app:Express = express();

const router:Router = express.Router();
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api', router)

router.get('/list', async (req:Request, res:Response) => {
  const result = await axios.post('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
  res.json({
    data: result.data
  })
})

app.listen(8888, () => {
  console.log("listeng: http://localhost:8888")
})