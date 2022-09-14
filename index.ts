import 'dotenv/config';
import app from '@config/app';
import '@config/database';

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
