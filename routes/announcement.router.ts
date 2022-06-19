import { Router } from 'express';
import { authJwt, checkAnnouncementAccess } from '../middleware/auth';
import { AnnouncementController } from '../controllers/announcement.controller';

export const announcementRouter = Router();

announcementRouter
  .get('/', AnnouncementController.getAnnouncements)
  .post('/', authJwt, AnnouncementController.createAnnouncement);

announcementRouter.route('/:announcementId')
  .get(AnnouncementController.getAnnouncement)
  .patch(authJwt, checkAnnouncementAccess, AnnouncementController.updateAnnouncement)
  .delete(authJwt, checkAnnouncementAccess, AnnouncementController.deleteAnnouncement);
