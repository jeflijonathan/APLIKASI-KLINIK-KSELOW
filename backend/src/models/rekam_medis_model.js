import mongoose from "mongoose";

const rekamMedisSchema = new mongoose.Schema(
  {
    pasien: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pasien",
      required: [true, "Pasien wajib diisi"],
    },

    tanggal: {
      type: Date,
      default: Date.now,
      required: [true, "Tanggal pemeriksaan wajib diisi"],
    },

    keluhan: {
      type: String,
      required: [true, "Keluhan wajib diisi"],
      trim: true,
    },

    dokter: {
      type: String,
      required: [true, "Dokter wajib diisi"],
      trim: true,
    },

    beratBadan: {
      type: Number,
      required: [true, "Berat badan wajib diisi"],
    },

    tekananDarah: {
      type: String,
      required: [true, "Tekanan darah wajib diisi"],
      trim: true,
    },

    suhuBadan: {
      type: Number,
      required: [true, "Suhu badan wajib diisi"],
    },

    diagnosa: {
      type: String,
      required: [true, "Diagnosa wajib diisi"],
      trim: true,
    },

    resep: {
      type: [String],
      default: [],
    },

    catatan: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

rekamMedisSchema.index({ diagnosa: 1 });
rekamMedisSchema.index({ pasien: 1 });

export default mongoose.model("RekamMedis", rekamMedisSchema);
