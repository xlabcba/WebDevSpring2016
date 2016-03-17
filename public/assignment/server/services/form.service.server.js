module.exports = function(app, formModel) {

    app.get("/api/assignment/form", getAllForms);
    app.get("/api/assignment/user/:userId/form", getAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getAllForms(req, res) {
        var forms = formModel.findAllForms();
        res.json(forms);
    }

    function getAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var form = req.body;
        var userId = req.params.userId;
        var forms = formModel.createFormForUser(userId, form);
        res.json(forms);
    }

    function updateFormById(req, res) {
        var newForm = req.body;
        var formId = req.params.formId;
        var forms = formModel.updateFormById(formId, newForm);
        res.json(forms);
    }

};