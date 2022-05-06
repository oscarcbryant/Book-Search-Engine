const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
    users: async () =>{
        return User.find().populate('books');
    },
    
    user: async (parent, { username }) => {
        return User.findOne({ username }).populate('books');
    },

    me: async (parent, args, context) => {
        if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('books');
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    },

Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
        },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
    
        if (!user) {
            throw new AuthenticationError('No user found with this email address');
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);

        return { token, user };
    },
    storeBook: async (parent, { BookID }, context) => {
        if (context.user) {
        const book = await Book.create({
            BookID,
        });

        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { books: book._id } }
        );

        return user;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    

removeBook: async (parent, { BookId }, context) => {
    if (context.user) {
    const book = await Book.findOneAndDelete({
        _id: BookId,

    });
    await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { books: book._id } }
    );

    return book;
            }
        }
    }
}
module.exports = resolvers;