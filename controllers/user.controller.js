const User = require('../models/user.model');

//1. Create a user
const addUser = async(req, res) => {
    try {
        const {firstname, lastname, age, coordinate} = req.body;

        const user = new User({
            firstname: firstname.toLowerCase(),
            lastname: lastname.toLowerCase(),
            age: age,
            coordinate: coordinate
        });

    await user.save();

    return res.status(200).send({
        success: true,
        message: 'User has been created successfully!'
    });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Server error!'
        });
    }
};

//2. Get a user by id 
const findUserById = async(req, res) => {
    let id = req.query.id;

    try {
        let user = await User.findById(id);

        if(!user) {
            return res.status(400).send({
                success: false,
                message: `Cannot find user with id ${id}`
            })
        };

        res.status(200).send({
            sucess: true,
            message: `Get user information by _id ${id} successfully!`,
            data: user
        });
    } catch(error) {
        return res.status(500).send({
            success: false,
            message: 'Server error!'
        });
    }
};
//3. Find users by firstname or lastname
const findUsersByFirstOrLastName = async(req, res) => {
    let name = (req.query.name).toLowerCase();
    //Create an instance RegEx 
    let re = new RegExp("^" + name);
    //$or: Or condition
    //Sort with value -1: Sort descending
    try {
        let users = await User.find({
            $or: [
                {
                    firstname: re
                }, 
                {
                    lastname: re
                }
            ]
        }).sort({
            firstname: -1
        });

        if(!users.length) {
            return res.status(400).send({
                success: false,
                message: `Cannot find any users with name: ${name}!`
            });
        }

        res.status(200).send({
            success: true,
            message: `Get users information by name:${name} successfully!`,
            data: users
        });

    } catch (error) {
        return res.status(500).send({
            sucess: false,
            message: 'Server error!'
        });
    }
};

//4. Update a user by id
const updateUserById = async(req, res) => {
    let id = req.params.id;

    const body = req.body;
    //Check if body data is empty
    if(!Object.keys(body).length) {
        return res.status(400).send({
            success: true,
            message: `Nothing to update!`
        });
    }

    try {
        const user_updated = await User.findByIdAndUpdate(id, body, {
            new: true
        });

        if(!user_updated) {
            return res.status(400).send({
                success: false,
                message: `Cannot find user with _id ${id}`
            });
        }

        res.status(200).send({
            success: true,
            message: `User with _id ${id} has updated successfully!`,
            data: user_updated
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Server error!'
        });
    }
};

//5. Delete a user by id 
const removeUserById = async(req, res) => {
    let id = req.params.id;

    try {
        const user_deleted = await User.findByIdAndDelete(id)

        if(!user_deleted) {
            return res.status(400).send({
                success: false,
                message: `Cannot find user with _id ${id}`
            });
        }

        res.status(200).send({
            success: true,
            message: `User with _id ${id} has removed successfully!`,
            data: user_deleted
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Server error!'
        });
    }
};

//6. Find n users have the coordinate nearest with the chosen userID coordinate (Not done yet)
const findUsersNear = async(req, res) => {
    //const n = req.query.n;
    //const userId = req.query.userId;
    try {
        let coordinates = await User.find().select({ coordinate: 1 });

        res.status(200).send({
            data: coordinates
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Server error!'
        });
    }
};

const userController = {
    addUser,
    findUserById,
    findUsersByFirstOrLastName,
    updateUserById,
    removeUserById,
    findUsersNear
};

module.exports = userController;
