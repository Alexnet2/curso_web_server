import app from '@config/app';
import { categoryController } from '@controllers';

app.route('/categories')
    .get(categoryController.findAll)
    .post(categoryController.save);

app.route('/categories/tree').get(categoryController.getTree);

app.route('/categories/:id')
    .get(categoryController.findById)
    .put(categoryController.save)
    .delete(categoryController.remove);
