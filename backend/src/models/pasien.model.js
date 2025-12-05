import mongoose from "mongoose";

const pasienSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama pasien wajib diisi"],
      trim: true,
      minlength: [3, "Nama minimal 3 karakter"],
    },
    tanggal_lahir: {
      type: Date,
      required: [true, "Tanggal lahir wajib diisi"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Tanggal lahir tidak boleh di masa depan",
      },
    },
    jenis_kelamin: {
      type: String,
      required: [true, "Jenis kelamin wajib dipilih"],
      enum: {
        values: ["Laki-laki", "Perempuan"],
        message: "Jenis kelamin harus Laki-laki atau Perempuan",
      },
    },
    asuransi: {
      type: String,
      enum: {
        values: [
          "BPJS Kesehatan",
          "Asuransi Swasta",
          "Mandiri Inhealth",
          "Tidak Ada",
        ],
        message:
          "Asuransi harus salah satu dari: BPJS Kesehatan, Asuransi Swasta, Mandiri Inhealth, atau Tidak Ada",
      },
      required: [true, "Asuransi wajib dipilih"],
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

pasienSchema.index({ nama: 1 });
pasienSchema.index({ isActive: 1 });

export default mongoose.model("Pasien", pasienSchema);
