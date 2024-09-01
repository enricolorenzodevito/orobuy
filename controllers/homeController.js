exports.goToHome = async (req, res) => {
    try {
        res.render('index', { title: 'Home'});
    } catch (error) {
        res.status(500).send(error);
    }
};