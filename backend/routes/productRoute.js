import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';



const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);
productRouter.get('/list', listProducts);//,adminAuth removed
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);


export default productRouter;

//,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}])

// import express from 'express';
// import { addProduct } from '../controllers/productController.js';
// import multer from 'multer';

// const router = express.Router();

// // Multer Configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Use `upload.fields()` to allow multiple named images
// router.post('/add', addProduct);

// export default router;
