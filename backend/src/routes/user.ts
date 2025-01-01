import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';
import { withAccelerate } from '@prisma/extension-accelerate';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Signup Route
userRouter.post('/signup', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { username, password, name } = body;

    if (!username || !password || !name) {
      c.status(400);
      return c.json({ message: 'All fields (username, password, name) are required.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      c.status(409);
      return c.json({ message: 'Username is already taken.' });
    }

    //TODO:Hash the password ---DONE
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    console.error('Error during signup:', error);
    c.status(500);
    return c.json({ message: 'An error occurred during signup.' });
  }
});

// Signin Route
userRouter.post('/signin', async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const { username, password } = body;
  
      if (!username || !password) {
        c.status(400);
        return c.json({ message: 'Both username and password are required.' });
      }
  
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (!user) {
        c.status(401);
        return c.json({ message: 'Invalid credentials.' });
      }
  
      console.log('Stored Password:', user.password); // Debugging log
  
      // Compare the hashed password with the plain text password
      const isMatch = bcrypt.compareSync(password, user.password);
  
      console.log('Password Match:', isMatch); // Debugging log
  
      if (!isMatch) {
        c.status(401);
        return c.json({ message: 'Invalid credentials.' });
      }
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log(token);
      return c.json({ token });
      
    } catch (error) {
      console.error('Error during signin:', error);
      c.status(500);
      return c.json({ message: 'An error occurred during signin.' });
    }
  });

// Delete User Route
// userRouter.delete('/delete', async (c) => {
//   try {
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     const body = await c.req.json();
//     const { username } = body;

//     if (!username) {
//       c.status(400);
//       return c.json({ message: 'Username is required.' });
//     }

//     const user = await prisma.user.findUnique({ where: { username } });

//     if (!user) {
//       c.status(404);
//       return c.json({ message: 'User not found.' });
//     }

//     await prisma.user.delete({ where: { username } });

//     return c.json({ message: `User '${username}' deleted successfully.` });
//   } catch (error) {
//     console.error('Error during user deletion:', error);
//     c.status(500);
//     return c.json({ message: 'An error occurred during user deletion.' });
//   }
// });


userRouter.delete('/delete', async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const { username } = body;
  
      if (!username) {
        c.status(400);
        return c.json({ message: 'Username is required.' });
      }
  
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (!user) {
        c.status(404);
        return c.json({ message: 'User not found.' });
      }
  
      // Delete related Blog records
      await prisma.blog.deleteMany({ where: { authorId: user.id } });
  
      // Delete the User
      await prisma.user.delete({ where: { username } });
  
      return c.json({ message: `User '${username}' deleted successfully.` });
    } catch (error) {
      console.error('Error during user deletion:', error);
      c.status(500);
      return c.json({ message: 'An error occurred during user deletion.' });
    }
  });
  
