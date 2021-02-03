const apuesta = require("../models/apuesta")

searchAll = async (req,res)=>{
    let {search} = req.params
    search.toLowerCase()
    console.log(search)
    const apuestas = await apuesta.find({
        "$or":[{
                "leftFreestyler.nombre": { '$regex' : search, '$options' : 'i' }
            },
            {
                "rightFreestyler.nombre": {"$regex": search,'$options' : 'i'}
            },
            {
                "leftFreestyler.pais": {"$regex": search,'$options' : 'i'}
            },{
                "rightFreestyler.pais": {"$regex": search,'$options' : 'i'}
            }
        ]
    }
        // },
        // {
        //     "leftFreestyler": {
        //         "pais": `.*${search}.*`
        //     }
        // },
        // {
        //     "rightFreestyler": {
        //         "pais": `.*${search}.*`
        //     }
        //}
    ).catch(err=>res.json({error : err}))
    res.json({apuestas})
}

module.exports = searchAll