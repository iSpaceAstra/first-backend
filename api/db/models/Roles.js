const mongoose = require("mongoose");
const RolePrivileges = require("./RolePrivileges");

const schema = mongoose.Schema({
    role_name: { type: String, required: true, unique: true },
    is_active: { type: Boolean, default: true },
    created_by: {
        type: mongoose.SchemaTypes.ObjectId
    }
}, {

    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class Roles extends mongoose.Model {

    static async deleteMany(query) {

    if (query._id) {
        const roleId = new mongoose.Types.ObjectId(query._id);
        
        const result = await RolePrivileges.deleteMany({ role_id: roleId });
    } else {
        console.log("HATA: query._id bulunamadı!");
    }

    return await mongoose.Model.deleteMany.call(this, query);
}
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);