const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

commentRouter.get('/', async (request, response) => {
    const comments = await Comment.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
    }).populate('user', { username: 1, name: 1 })
    response.json(comments)
})

commentRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const blog = request.blog
    const user = request.user
    const comment = new Comment({
        content: body.content,
        blog: blog.id,
        user: user.id,
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
})

commentRouter.delete(
    '/:id',
    middleware.userExtractor,
    async (request, response) => {
        const user = request.user
        const comment = await Comment.findById(request.params.id)
        if (comment.user.toString() === user.id.toString()) {
            await Comment.findByIdAndRemove(request.params.id)
            console.log('deleted')
        } else {
            console.log('Not authorized to delete')
        }
        response.status(204).end()
    }
)

commentRouter.put('/:id', async (request, response) => {
    const body = request.body
    const comment = {
        content: body.conteny,
        blog: body.blog,
        user: body.user,
    }

    const updatedInfo = await Comment.findByIdAndUpdate(request.params.id, comment, {
        new: true,
    })
    response.status(200).json(updatedInfo)
})

module.exports = commentRouter
