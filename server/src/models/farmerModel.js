const mongoose = require("mongoose");

let Schema = mongoose.Schema;
// tao gia tri co ban
let farmerSchema = new Schema(
  {
    farmOwner: { type: String }, // chủ nông trại
    address: { type: String },
    landArea: {type:Number}, // diện tích
    typeOfTree: { type: String }, // giống cây
    // soilType: { type: String }, // loại đất
    // waterSource: { type: String }, // nguồn nước
    totalTrees:{type:Number},
    CooperativeId:{ type: String },
    deletedAt: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
// goi cac function co trong thu vien
farmerSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showFarmer(id) {
    return this.find({CooperativeId:id}).exec();
  },
};

module.exports = mongoose.model("farmer", farmerSchema);
