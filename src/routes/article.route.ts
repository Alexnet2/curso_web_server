import app from './user.route';
import { articleController } from '@controllers';

app.route('/articles')
    .get(articleController.findAll)
    .post(articleController.save);

app.route('/articles/:id')
    .get(articleController.findById)
    .put(articleController.save)
    .delete(articleController.remove);

app.route('/categories/:id/articles').get(articleController.findByCategory);
