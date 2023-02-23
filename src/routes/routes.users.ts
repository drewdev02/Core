import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/User';

const router: Router = Router();



router.get('/', async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
});



router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

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

router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    res.status(404).json({
        message: error.message,
    });
});


export default router;
