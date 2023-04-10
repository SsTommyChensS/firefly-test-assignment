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
    const n = req.query.n;
    const userId = req.query.userId;

    if(n <= 0) {
        return res.status(400).send({
            success: false,
            message: `Unvalid n!`,
        });
    }

    try {
        let distance_information = [];
        //Find coordinate of userId given
        let user_coordinate = await User.findById(userId).select({ coordinate: 1 });
        if(!user_coordinate) {
            return res.status(400).send({
                success: false,
                message: `Cannot find user with _id ${userId} !`
            });
        }   

        let x_user = parseInt(user_coordinate.coordinate.slice(0, 3));
        let y_user = parseInt(user_coordinate.coordinate.slice(4));

        //Find coordinate of other users
        let others_coordinate = await User.find({ _id: {
                $nin: userId
        }}).select({ coordinate: 1 });
        //Calculate the distance of 2 points (userID and each other user coordinate)
        others_coordinate.forEach(element => {
            let x_other_user = parseInt(element.coordinate.slice(0, 3));
            let y_other_user = parseInt(element.coordinate.slice(4));
            
            let distance = Math.sqrt(Math.pow(x_user - x_other_user, 2) + Math.pow(y_user - y_other_user, 2));

            distance_information.push({
                _id: element.id,
                coordinate: element.coordinate,
                distance: distance
            });
        });
        //Sort distance from closest -> furthest 
        distance_information.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
        //Get n users from the query that has closest distance with userID
        const result = distance_information.slice(0, n);

        res.status(200).send({
            success: true,
            data: {
                n: n,
                users: result
            }
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
