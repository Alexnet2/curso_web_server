import app from '@config/app';
import { userController } from '@controllers';

app.route('/users').post(userController.save).get(userController.findAll);
app.route('/users/:id').put(userController.save).get(userController.findById);

export default app;
