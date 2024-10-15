const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

invCont.buildByInventoryId = async function (req, res, next) {
    const inventory_id = req.params.inv_id;
    const data = await invModel.getInventoryById(inventory_id);
    const inv_details = await utilities.buildInvDetails(data);
    let nav = await utilities.getNav();
    const itemName = `${data.inv_make} ${data.inv_model} ${data.inv_year}`;
    res.render("./inventory/detail", {
        title: itemName,
        nav,
        inv_details,
    })
}

invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav();
    res.render("inventory/management", {
        title: "Vehicle Management",
        errors: null,
        nav,
    });
};

invCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav();

    res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
    });
};

invCont.addClassification = async function (req, res, next) {
    const { classification_name } = req.body;

    const response = await invModel.addClassification( classification_name );
    let nav = await utilities.getNav();
    if (response) {
        req.flash(
            "notice",
            `The "${classification_name}" classification was successfully added.`
        );
        res.render("inventory/management", {
            title: "Vehicle Management",
            errors: null,
            nav,
            classification_name,
        });
    } else {
        req.flash("notice", `Failed to add ${classification_name}`);
        res.render("inventory/add-classification", {
            title: "Add New Classification",
            errors: null,
            nav,
            classification_name,
        });
    }
};

invCont.buildAddInventory = async function (req, res, next) {
    const nav = await utilities.getNav();
    let classifications = await utilities.buildClassificationList();

    res.render("inventory/add-inventory", {
        title: "Add Vehicle",
        errors: null,
        nav,
        classifications,
    });
};

invCont.addInventory = async function (req, res, next) {
    const nav = await utilities.getNav();

    const {
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id,
    } = req.body;

    const response = await invModel.addInventory(
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
    );

    if (response) {
        req.flash(
            "notice",
            `The ${inv_make} ${inv_model} successfully added.`
        );
        const classificationSelect = await utilities.buildClassificationList(classification_id);
        res.render("inventory/management", {
            title: "Vehicle Management",
            nav,
            classificationSelect,
            errors: null,
        });
    } else {
        req.flash("notice", "There was a problem.");
        res.render("inventory/addInventory", {
            title: "Add Vehicle",
            nav,
            errors: null,
        });
    }
};


module.exports = invCont