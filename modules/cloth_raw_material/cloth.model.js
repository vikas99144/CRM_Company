const inventorySchema = new mongoose.Schema(
  {
    org_name: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "companies" },
    gst_no: { type: String, required: true },
    email: { type: String, required: true },
    country_code: { type: String, required: true },
    contact_number: { type: String, required: true },
    purchase_date: { type: Date },
    address: [{ type: String }],
    total_price: { type: Number },
    account_no: { type: String },
    IFSC_code: { type: String },
    cloth_type: [
      {
        cloth_category: { type: String },
        sub_cloth_type: [
          {
            price: { type: Number },
            sub_cloth_type: { type: String },
            sub_cloth_type_details: [
              {
                color: { type: String },
                weight: { type: Number },
                quantity: { type: Number },
                length_size: { type: String },
                cloth_image: { type: String },
              }
            ],
          },
        ],
      },
    ],
    is_active: { type: Boolean, default: true },
    account_status: {
      type: String,
      enum: [
        accountStatus.Pending,
        accountStatus.Approved,
        accountStatus.Rejected,
        accountStatus.Requestd,
      ],
      default: accountStatus.Approved,
    },
    is_deleted: { type: Boolean, default: false },
    created_by: { type: String },
    updated_by: { type: String },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model('raw_materials', inventorySchema, 'raw_materials');