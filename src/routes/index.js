import { Router } from 'express';
import { getNav } from '../../utilities/index.js';

const router = Router();
 
// The home page route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// The about page route
router.get('/about', async  (req, res) => {
    const nav = await getNav();
    res.render('partials/about', { title: 'About Page', nav });
});


export default router;
