router.get('/views', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.render('account', { user });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

