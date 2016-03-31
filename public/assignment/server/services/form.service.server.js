module.exports = function(app, formModel) {

    app.get("/api/assignment/form", getAllForms);
    app.get("/api/assignment/user/:userId/form", getAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getAllForms(req, res) {

        var forms = formModel.findAllForms()
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllFormsForUser(req, res) {

        var userId = req.params.userId;

        var forms = formModel.findAllFormsForUser(userId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormById(req, res) {

        var formId = req.params.formId;

        var form = formModel.findFormById(formId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;

        var form = formModel.deleteFormById(formId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {

        var form = req.body;
        var userId = req.params.userId;

        var newForm = formModel.createFormForUser(userId, form)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {

        var newForm = req.body;
        var formId = req.params.formId;

        var form = formModel.updateFormById(formId, newForm)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

};