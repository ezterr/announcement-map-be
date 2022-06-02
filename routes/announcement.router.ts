import { Router } from 'express';
import { authJwt } from '../middleware/auth';
import { AnnouncementController } from '../controllers/announcement.controller';

export const announcementRouter = Router();

announcementRouter
  .get('/', AnnouncementController.getAnnouncements)
  .post('/', authJwt, AnnouncementController.addAnnouncement);

announcementRouter.route('/:announcementId')
  .get(AnnouncementController.getAnnouncement)
  .patch(authJwt, AnnouncementController.updateById)
  .delete(authJwt, AnnouncementController.deleteById);

// @TODO dodać sprawdzanie czy jest to ogłoszenie danego użytkownika dla patch i delete
