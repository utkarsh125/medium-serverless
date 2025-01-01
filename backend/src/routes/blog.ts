import { CreateBlogInput, createBlogInput, deleteBlogInput, updateBlogInput } from "@utkarsh125/blog-common";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import {decode, jwt, verify} from "hono/jwt";

import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono <{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables:{
        userId: string,
    }
}>();

blogRouter.use("/*", async(c, next) =>{

    const authHeader = c.req.header("authorization") || "";

    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if(user){
            //@ts-ignore
            c.set('userId', user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "Failed to authenticate user",
            });
        }
    }catch(error){
        console.log("Error in blogRouter: ", error);
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }
});

blogRouter.post("/", async(c) => {
    //always use accelerate in each route

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //Create new Blog

    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid Input"
        })
    }

    const userId = c.get('userId');
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(userId) //HARDCODED: CHANGE IT
        }
    })
    return c.json({
        id: blog.id
    })
});

blogRouter.put('/', async(c) => {
    //always use prisma client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //UPDATION IN BLOGS
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid Input"
        });
    };

    const blog = await prisma.blog.update({
        where: {
            id: body.id,

        },
        data:{
            title: body.title,
            content: body.content,
        }
    });
    return c.json({
        id: blog.id
    })
});


//PUT /bulk above since we need to call it first
//TODO: Pagination

blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          createdAt: true,
          author: {
            select: {
            //   id: true,
              name: true,
            //   username: true
            }
          }
        }
      });
    return c.json({
        blogs
    })
});

blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    try{
        const blog = await prisma.blog.findMany({
            where:{
                id: Number(id),
            },
            select:{
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            blog
        });

    }catch(error){
        c.status(411);
        return c.json({
            message: "Error while fetching the blog"
        })
    }
});

  
blogRouter.delete('/:id', async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      // Get the blog ID from the route parameter
      const id = Number(c.req.param('id'));
  
      // Extract the username from the request body
      const { username } = await c.req.json();
  
      if (!username) {
        c.status(400);
        return c.json({ message: 'Username is required.' });
      }
  
      if (isNaN(id)) {
        c.status(400);
        return c.json({ message: 'Invalid Blog ID: Not a number' });
      }
  
      // Fetch the user to resolve authorId
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (!user) {
        c.status(404);
        return c.json({ message: 'User not found.' });
      }
  
      // Check if the blog exists and belongs to the user
      const blog = await prisma.blog.findUnique({ where: { id } });
  
      if (!blog) {
        c.status(404);
        return c.json({ message: 'Blog not found.' });
      }
  
      if (blog.authorId !== user.id) {
        c.status(403);
        return c.json({ message: 'You are not authorized to delete this blog.' });
      }
  
      // Delete the blog
      await prisma.blog.delete({ where: { id } });
  
      return c.json({ message: 'Blog deleted successfully.' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      c.status(500);
      return c.json({ message: 'An error occurred during deletion.' });
    }
  });
  
