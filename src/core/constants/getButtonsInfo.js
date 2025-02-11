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
                        name: "табель выходов",
                        isActive: false,
                        route: "events"
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
                    buttons["stuff"] = {
                        name: "персонал",
                        isActive: false,
                        route: "stuff"
                    };
                    buttons["stores"] = {
                        name: "подразделения",
                        isActive: false,
                        route: "stores"
                    };
                    buttons["sells"] = {
                        name: "продажи",
                        isActive: false,
                        route: "sells"
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
                    buttons["events"] = {
                        name: "табель выходов",
                        isActive: false,
                        route: "events"
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
                    buttons["events"] = {
                        name: "табель выходов",
                        isActive: false,
                        route: "events"
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
    return buttons;
};

export default getButtonsInfo;