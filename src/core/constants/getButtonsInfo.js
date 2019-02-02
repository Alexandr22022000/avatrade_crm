import {PERMISSIONS} from "./index";

const getButtonsInfo = (permission) => {
    let buttons = {};
    if (permission !== null) {
        for (let perm in permission) {
            switch (permission[perm]) {
                case PERMISSIONS.OWNER:
                case PERMISSIONS.TOP_MANAGER:
                    buttons["planning"] = {
                        name: "планинг",
                        isActive: false,
                        route: "planning"
                    };
                    buttons["warehouse"] = {
                        name: "склад",
                        isActive: false,
                        route: "warehouse"
                    };
                    buttons["turnovers"] = {
                        name: "обороты",
                        isActive: false,
                        route: "turnovers"
                    };
                    buttons["events"] = {
                        name: "движуха",
                        isActive: false,
                        route: "events"
                    };
                    buttons["stuff"] = {
                        name: "персонал",
                        isActive: false,
                        route: "stuff"
                    };
                    buttons["cabinet"] = {
                        name: "кабинет",
                        isActive: false,
                        route: "cabinet"
                    };
                    buttons["prices"] = {
                        name: "прайс",
                        isActive: false,
                        route: "prices"
                    };
                    break;
                case PERMISSIONS.STORE_MANAGER:
                    buttons["cash"] = {
                        name: "касса",
                        isActive: false,
                        route: "cash"
                    };
                    buttons["warehouse"] = {
                        name: "склад",
                        isActive: false,
                        route: "warehouse"
                    };
                    buttons["planning"] = {
                        name: "планинг",
                        isActive: false,
                        route: "planning"
                    };
                    buttons["cabinet"] = {
                        name: "кабинет",
                        isActive: false,
                        route: "cabinet"
                    };
                    buttons["contacts"] = {
                        name: "контакты",
                        isActive: false,
                        route: "contacts"
                    };
                    buttons["prices"] = {
                        name: "прайс",
                        isActive: false,
                        route: "prices"
                    };
                    break;
                case PERMISSIONS.WAREHOUSE_MANAGER:
                    buttons["planning"] = {
                        name: "планинг",
                        isActive: false,
                        route: "planning"
                    };
                    buttons["warehouse"] = {
                        name: "склад",
                        isActive: false,
                        route: "warehouse"
                    };
                    buttons["cabinet"] = {
                        name: "кабинет",
                        isActive: false,
                        route: "cabinet"
                    };
                    buttons["contacts"] = {
                        name: "контакты",
                        isActive: false,
                        route: "contacts"
                    };
                    buttons["prices"] = {
                        name: "прайс",
                        isActive: false,
                        route: "prices"
                    };
                    break;
                default:
                    break;
            }
        }
    }
    console.log(buttons);
    return buttons;
};

export default getButtonsInfo;