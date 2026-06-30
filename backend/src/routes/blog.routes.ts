import { Router, Request } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller';

const router = Router();

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: any) => {
    const uploadDir = path.resolve(process.cwd(), 'uploads');
    cb(null, uploadDir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb: any) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: any) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', authMiddleware, upload.single('image'), createBlog);
router.put('/:id', authMiddleware, upload.single('image'), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;
