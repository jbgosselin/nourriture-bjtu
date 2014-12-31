module.exports = function(pol) {
	APP.on("DBEvent", function(Model, evt, data, user) {
		idt = Model.identity;
		if (idt == "ingredient") {
			Timeline.create({name: evt, domain: idt, user: user, ingredient: data}).then(function(entry) {
				APP.dbEvent(Timeline, "create", entry);
			});
		}
	});

	var router = require("express").Router();
	var rest = Rest(Timeline);

	router.route("/count").get(rest.count);

	router.route("/").get(rest.find)

	router.route("/:id").get(rest.findOne)

	return router;
};
