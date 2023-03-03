import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

async function googleLogin(req: Request, res: Response): Promise<void> {
    let user: IUser;
    try {
        const { id, username, image } = req.body;
        user = new User({
            id: id,
            username,
            image,
        });
        await user.save();
        res.json(user);
    } catch (err: any) {
        if (err.code === 11000){
            res.json({message: "User Already Exists"});
        }
        res.status(400).json({ message: 'Authentication failed' });
    }
}

async function getUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    console.log(userId);
    try {
        const user = await User.findOne({ id: userId })
            .select({ id: 1, username: 1, image: 1, _id: 0 })
            .exec();

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export { googleLogin, getUser};
