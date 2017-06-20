const knex = require('./knex')

const joinComments=a=>{
    return a.join('comments','comments.post_id', '=', 'posts.id')
}

module.exports = {
    getAllLinks: function(){
        return(knex('links'))
    },
    getAllUsers: function(){
        return(knex('users'))
    },
    getUser: function(id){
        return knex('users').where('users.id',id).join('posts', 'posts.user_id', 'users.id').join('comments','comments.post_id', 'posts.id').select('users.id', 'users.name', 'users.email', 'users.password', 'users.created_at as user_since', 'users.is_active', 'posts.posted_on as blog_posts_date', 'posts.title as blog_posts_title', 'posts.content as blog_posts_content', 'comments.content as comments')
    },
    getUserByEmail: function(email){
        return knex('users').where('email',email).first()
    },
    getAllPosts: function(){
        return joinComments(knex('posts')).select('posts.id', 'posts.posted_on', 'posts.title', 'comments.content as comments', 'posts.user_id')
    },
    getPost: function(id){
        return joinComments(knex('posts')).where('posts.id',id).select('posts.id', 'posts.posted_on', 'posts.title', 'comments.content as comments', 'posts.user_id')
    },
    create: function(thing, table){
        return knex(table).insert(thing, '*').then(thing=>{return thing[0]})
    },
    createUser: function(user){
        return knex('users').insert(user, 'id').then(ids=>{
            return ids[0]
        })
    },
    update: function(id, thing, table){
        return knex(table).where('id', id).update(thing, '*')
    },
    delete: function(id, table){
        return knex(table).where('id', id).del()
    }
}
