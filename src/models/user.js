const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.json');

const User = (sequelize, DataTypes) => {
    class User extends Model {
        //user has many config
        //User -> Config 0-m
        //Config -> User 1-1
        static associate(models) {
            this.hasMany(models.Config);
        }
    }

    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.STRING,
    }, { sequelize, modelName: 'User', });

    User.hasValidCredentials = async function(username, password) {
        //no data
        if (!username || !password) return false;
        //search user in db
        let user = await User.findOne({ where: { username: username + '' } });
        //user Not found
        if (!user) return false;
        //Compare hash with password
        if (!bcrypt.compareSync(password + '', user.password, 11)) return false;
        return user;

    }

    User.updateMe = async function(data, user) {
        //find user
        let me = await User.findByPk(user.id);
        //merge data and keep current id
        me = {...me, ...data, ... { id: user.id } }
            //save user
        return await me.save();
    }

    User.deleteMe = async function(user) {
        //find user corresponding to the current session
        let me = await User.findByPk(user.id);
        //delete it
        return await me.destroy();
    }

    User.deleteById = async function(id) {
        //find user by id
        let user = await User.findByPk(id);
        //delete it
        return await user.destroy();
    }

    User.prototype.sign = function() {
        //return a jwt
        return jwt.sign({
            id: this.id,
            username: this.username,
            role: this.role
        }, jwtConfig.key, { expiresIn: jwtConfig.expiration })
    }

    return User;
};

module.exports = User;