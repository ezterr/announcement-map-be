import { Router } from 'express';
import { authJwt } from '../middleware/auth';
import { AnnouncementController } from '../controllers/announcement.controller';

export const announcementRouter = Router();

announcementRouter
  .get('/', AnnouncementController.getAnnouncements) // pobiera tylko najpotrzebniejsze informacje {coords, id} query string 'all' powoduje pobranie wszystkich informacji
  .post('/', authJwt, AnnouncementController.addAnnouncement); // dodaje ogłoszenie tylko zalogowani

announcementRouter.route('/:announcementId')
  .get(AnnouncementController.getAnnouncement) // pobiera ogłoszeni po id
  .patch(authJwt) // sprawdzanie czy jest to ogłoszenie użytkownika lub czy użytkownik jest adminem
  .delete(authJwt); // sprawdzanie czy jest to ogłoszenie użytkownika lub czy użytkownik jest adminem
