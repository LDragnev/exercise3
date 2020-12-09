sap.ui.define([
	"../model/formatter",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (formatter, Controller, JSONModel, mobileLibrary, Filter, FilterOperator) {
	"use strict";

	var PopinLayout = mobileLibrary.PopinLayout;

	var TableController = Controller.extend("com.kpmg.exercise3.controller.View1", {
		formatter: formatter,
		onInit: function () {
			var productsModel = this.getView().getModel("productsModel");
		},
		onFilter : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("idProductsTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPopinLayoutChanged: function () {
			var oTable = this.byId("idProductsTable");
			var oComboBox = this.byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			switch (sPopinLayout) {
			case "Block":
				oTable.setPopinLayout(PopinLayout.Block);
				break;
			case "GridLarge":
				oTable.setPopinLayout(PopinLayout.GridLarge);
				break;
			case "GridSmall":
				oTable.setPopinLayout(PopinLayout.GridSmall);
				break;
			default:
				oTable.setPopinLayout(PopinLayout.Block);
				break;
			}
		},

		onSelect: function (oEvent) {
			var bSelected = oEvent.getParameter("selected"),
				sText = oEvent.getSource().getText(),
				oTable = this.byId("idProductsTable"),
				aSticky = oTable.getSticky() || [];

			if (bSelected) {
				aSticky.push(sText);
			} else if (aSticky.length) {
				var iElementIndex = aSticky.indexOf(sText);
				aSticky.splice(iElementIndex, 1);
			}

			oTable.setSticky(aSticky);
		},

		onToggleInfoToolbar: function (oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		}
	});
	return TableController;
});