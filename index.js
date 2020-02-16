const app = require('./app');
const port = process.env.PORT || 5000;
//const port = process.env.PORT || 4200;
/* роут
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Working'
    })
})
*/
app.listen(port, () => console.log(`Server has been started on ${port}`));