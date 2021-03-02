import multer from 'multer';
import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/' });
const multerAvatar = multer({ dest: 'uploads/avatars/' });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

/* 로그아웃된 사용자만 접근할 수 있게 만드는 미들웨어 */
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');