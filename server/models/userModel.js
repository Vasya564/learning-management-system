const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['студент', 'викладач', 'адміністратор'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static create new user
userSchema.statics.createUser = async function(fullname, role, email, password) {

    if (!fullname || !role || !email || !password) {
        throw Error('Всі поля повинні бути заповнені')
    }

    if (!validator.isEmail(email)) {
        throw Error('Пошта введена некоректно')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Пароль недостатньо сильний')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Ця пошта вже використовується')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ fullname, role, email, password: hash})

    return user
}

// static login
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('Всі поля повинні бути заповнені')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Неправильні дані для входу')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Неправильні дані для входу')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)