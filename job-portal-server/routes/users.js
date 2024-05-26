const router = require('express').Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/", async(req,res) => {
    try {
        const { error} = validate(req.body);
        if(error) 
        return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});

        if(user) 
         return res.status(409).send({message: "User with given email already exist"})
        
         const salt = await bcrypt.genSalt(Number(process.env.Salt))
         const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        await new User({...req.body, password:hashPassword}).save();
        res.status(201).send({message:"User created successfully"})    
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
    }
})

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: "Invalid Token" });
    }
};

// GET route to retrieve user data by email
router.get("/:email",  async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Optionally, you can remove sensitive information from the user object before sending it
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role
            // Add other non-sensitive fields as needed
        };

        res.status(200).send(userData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;