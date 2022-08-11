import {Database} from 'https://deno.land/x/jsweb/mod.ts'

let db = new Database("deno","mysql")
await db.connect(
	"cardb",
	"172.17.0.2",
	"root",
	"admin12345"
	)

// GET ALL FROM DATABASE

const getall = async(ctx)=>{
	let query1 = await db.execute(`
		select * from tblcar
		`)
	ctx.res.setHeader("Content-Type","application/json")
	ctx.res.body = JSON.stringify(query1)
}

// ADD DATA TO DATABASE
const adddata = async(ctx)=>{
	let d = await ctx.req.post.get("json")
	console.log(d.nama)
	try{
		let query2 = await db.execute(`
			insert into tblcar (nama)
			values("${d.nama}")
		`)
		ctx.res.body = JSON.stringify(d.nama)
	}catch(err){
		console.log(err)
		ctx.res.body = err
	}
}

// DELETE DATA FROM DATABASE GET ID 
const deleteid = async(ctx)=>{
	let d = await ctx.req.post.get("json")
	console.log(d)
	try{
		await db.execute(`
			delete from tblcar where id = "${d.id}"
			`)
		ctx.res.body = "success delete id " + d.id
	}catch(err){
		ctx.res.body = err
	}
}

// EDIT DATA FROM DATABSE

const editid = async(ctx)=>{
	let d = await ctx.req.post.get("json")
	console.log(d)
	try{
		let query = await db.execute(`
			update tblcar set nama ='${d.nama}'
			where id = ${d.id}
		`)
		ctx.res.body = JSON.stringify(d)
	}catch(err){
		ctx.res.body = err
	}
}
export {getall,adddata,deleteid,editid}