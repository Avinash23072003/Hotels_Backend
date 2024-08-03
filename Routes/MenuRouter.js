const express = require("express");
const router = express.Router();
const Menu=require('../models/Menu')

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Menu(data); // Initialize newPerson with request body data
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/', async (req, res) => {
    try {
        const data = await Menu.find(); // Corrected the fetch operation
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/:TasteType',async (req,res)=>{
    try{
      const TasteType=req.params.TasteType;
      if(TasteType=='sweet' || TasteType=='spicy' || TasteType=='sour'){
       const response=await  Menu.find({taste:TasteType});
       console.log('Data fetched');
       res.status(200).json(response);
      }
      else{
       console.log('error');
       res.status(404).json({ error: "Data not found" });
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
   })


module.exports = router;