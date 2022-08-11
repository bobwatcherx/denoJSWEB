import {Application,cors,Router} from 'https://deno.land/x/jsweb/mod.ts'
import  {getall,adddata,deleteid,editid} from './routes/index.js'
const app = new Application("deno")
const router = new Router()


router.get("/",getall)
router.post("/delete",deleteid)
router.post("/edit",editid)
router.post("/adddata",adddata)


app.use(router.routes())
app.use(cors)
app.listen("127.0.0.1",5000)
console.log("server at 5000")