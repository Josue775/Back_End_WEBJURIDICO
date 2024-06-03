import app from './app.js'
import { sequelize } from './database/database.js';
import './email/email_send.js'
// import './models/roles.js'
// import './models/usurio.js'
// import './models/citas.js'
async function main(){
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false }).then(() => {
            console.log('Conexión a la base de datos establecida y modelos sincronizados');
            // Tu código para iniciar el servidor aquí
          })
          .catch(err => {
            console.error('Error al sincronizar los modelos con la base de datos:', err);
          });
        
        // Iniciar el servidor Express
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}.`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}
main();
