import mongoose from "mongoose";

const pasienSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
  },
  jenis_kelamin: {
    type: String,
    required: true,
  },
  asuransi: {
    type: String,
    enum: [
      "BPJS Kesehatan",
      "Asuransi Swasta",
      "Mandiri Inhealth",
      "Tidak Ada",
    ],
    required: true,
  }, //BPJS Kesehatan / Asuransi Swasta / Mandiri Inhealth
  isActive: {
    type: Boolean,
    default: true,
  }, //
});

export default mongoose.model("Pasien", pasienSchema);
