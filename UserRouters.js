import express from "express";

const Router = express.Router();
const adminRouter = express.Router();


//Home router
Router.get('/', (req, res) => {
    res.send('Welcome to my Personal Blog');
});


// About router
Router.get('/about', (req, res) => { 
    res.send("<h1>About</h1><p>This is a simple personal blog project.</p>");
});

// middleware for authentication for admin routers
adminRouter.use((req, res, next) => { 
    const isLoggedIn = true;
    if (!isLoggedIn) return res.status(401).send("Not authorized");
    next();
});

// Admin DashBoard
adminRouter.get('/', (req, res) => { 
    res.send('Admin Dashboard');
});

// create new article
adminRouter.get('/new', (req, res) => { 
    console.log("newArticle");
});

adminRouter.post('/new', (req, res) => {
    const { title, content } = req.body;
    
    const newArticle = {
        id: Date.now(),
        title, 
        content, 
        date: new Date().toISOString()
    };
    
    console.log("new article created: ", newArticle);
    
    res.redirect("/admin"); // back to dashboard after save
});

// edit article
adminRouter.get('/edit/:id', (req, res) => { 
    const { id } = req.params;
    
    res.redirect(`edit form from Article with ID: ${ id }`);
});

adminRouter.post('/edit/:id', (req, res) => { 
    const { id } = req.params;
    const { title, content } = req.body;

    const updateArticle = {
        id,
        title, 
        content, 
        date: new Date()
    }

    console.log("Article updated: ", updateArticle);
    res.redirect("/admin"); // back to dashboard
});

adminRouter.post('/delete/:id', (req, res) => { 
    const { id } = req.params;

    console.log(`Article deleted: ${id}`);

    res.redirect("/admin"); // back to dashboard 
});

export { Router, adminRouter};