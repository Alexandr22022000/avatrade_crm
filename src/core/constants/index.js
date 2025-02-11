export const PERMISSIONS = {
  OWNER: 0,
  STORE_MANAGER: 1,
  WAREHOUSE_MANAGER: 2,
  TOP_MANAGER: 3
};

export const PERMISSIONS_TEXT = [
    {
        id: 0,
        name: "Специалист по развитию",
    },
    {
        id: 1,
        name: "Менеджер",
    },
    {
        id: 2,
        name: "Производственник-кладовщик",
    },
    {
        id: 3,
        name: "Управляющий",
    },
];


export const checkPermissions = (currentPermissions, targetPermissions) => {
    for (let value of currentPermissions) {
        if (targetPermissions.indexOf(value)!==-1)
            return true;
        }
    return false;
};