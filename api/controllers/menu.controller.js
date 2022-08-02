const Menu = require("./../models/menu.model");

const getMenus = async (req, res, next) => {
    const menus = await Menu.find();
    if (!menus) return res.status(404).json({ error: "Menus not found" });

    try {
        res.json({ menus });
    } catch (err) {
        next(err);
    }
};

const addMenu = async (req, res, next) => {
    const { name, description, price, duration } = req.body;
    const image = req.file.path.replace(/\\/g, "/");

    if (await Menu.findOne({ name })) return res.status(400).json({ error: "Name already exists" });

    try {
        const newMenu = await Menu.create({
            name,
            description,
            price,
            image,
            duration,
        });

        if (!newMenu) return res.status(404).json({ error: "Menu not found" });

        res.json({ newMenu });
    } catch (err) {
        next(err);
    }
};

const updateMenu = async (req, res, next) => {
    const { name, description, price, duration } = req.body;
    const image = req.file.path.replace(/\\/g, "/");

    if (await Menu.findOne({ name })) return res.status(400).json({ error: "Name already exists" });

    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            image,
            duration,
        });

        if (!menu) return res.status(404).json({ error: "Menu not found" });

        res.json({ menu });
    } catch (err) {
        next(err);
    }
};

const deleteMenu = async (req, res, next) => {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) return res.status(404).json({ error: "Menu not found" });

    try {
        res.json({ menu });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getMenus,
    addMenu,
    updateMenu,
    deleteMenu,
};
