class RoleController {

    async findAll(req, res) {
        try {
            const roles = await RoleService.findAll();
            return res.status(200).json({ status: true, roles });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    async findById(req, res) {  
        try {
            const role = await RoleService.findById(req.params.id);
            return res.status(200).json({ status: true, role });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    async create(req, res) {
        try {
            const role = await RoleService.create(req.body);
            return res.status(200).json({ status: true, role });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    async update(req, res) {
        try {
            const role = await RoleService.update(req.params.id, req.body);
            return res.status(200).json({ status: true, role });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await RoleService.delete(req.params.id);
            return res.status(200).json({ status: true, message: "Role deleted successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }   


}

module.exports = new RoleController();
