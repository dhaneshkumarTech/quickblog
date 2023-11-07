import mongoose from 'mongoose'

import Blog from '../model/blog.model.js'

const findBlogById = async (id) => {
    return await Blog.findById(id)
}
const findAllBlogs = async () => {
    return await Blog.find({ isDeleted: false }).populate('userId', 'name')
}
const createBlog = async (title, content, userId) => {
    return await Blog.create({ title, content, userId })
}

const deleteBlog = async (blogId, userId) => {
    return await Blog.findOneAndUpdate({ blogId, userId, isDeleted: false }, { $set: { isDeleted: true } })
}
const findUserBlogs = async (userId) => {
    let matchCondition;
    if (userId) {
        matchCondition = { userId: new mongoose.Types.ObjectId(userId), isDeleted: false };
    }
    else {
        matchCondition = { isDeleted: false };
    }
    return await Blog.aggregate([
        {
            $match: matchCondition
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'blogId',
                as: 'comments'
            }
        },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'blogId',
                as: 'likes'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'comments.userId',
                foreignField: '_id',
                as: 'commentUsers'
            }
        },
        {
            $addFields: {
                author: { $arrayElemAt: ["$user.name", 0] },
                comments: {
                    $map: {
                        input: "$comments",
                        as: "comment",
                        in: {
                            content: "$$comment.content",
                            name: { $arrayElemAt: ["$commentUsers.name", { $indexOfArray: ["$commentUsers._id", "$$comment.userId"] }] }
                        }
                    }
                }
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                author: 1,
                comments: 1,
                likeCount: { $size: '$likes' }
            }
        }
    ]);
}

export default { findBlogById, findAllBlogs, createBlog, deleteBlog, findUserBlogs };
