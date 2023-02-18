import { Request, Response, Router } from 'express';
import User from '../models/User';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

router.post('/', async (req: Request, res: Response) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

router.put('/:id', async (req: Request, res: Response) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

export default router;
