sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sStatus) {
			case "Available":
				return resourceBundle.getText("Available");
			default:
				return sStatus;
			}
		}
	};
});
