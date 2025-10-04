import express from "express";
import { Router, adminRouter } from "./UserRouters.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', Router);
app.use('/admin', adminRouter);

// Server initialisation: http://localhost:3000
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
});