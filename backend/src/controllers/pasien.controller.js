import pasienSchema from "#models/pasien.model.js";

class PasienController {
  static async getAllPasien(req, res) {
    try {
      let { page = 1, limit = 10, search, jenis_kelamin, asuransi } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};

      if (search) {
        filter.nama = { $regex: search, $options: "i" };
      }

      if (jenis_kelamin) {
        filter.jenis_kelamin = jenis_kelamin;
      }

      if (asuransi) {
        filter.asuransi = asuransi;
      }

      const totalData = await pasienSchema.countDocuments(filter);

      const data = await pasienSchema
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully fetched data pasien",
        data: data,
        total: totalData,
        pagination: {
          totalData,
          currentPage: page,
          totalPages: Math.ceil(totalData / limit),
          limit,
        },
      });
    } catch (err) {
      const {
        statusCode = 500,
        message = "Internal Server Error",
        details,
      } = err;

      res.json({
        status: false,
        statusCode: statusCode,
        message: message,
        details: details,
      });
    }
  }

  static async getByIdPasien(req, res) {
    try {
      const { id } = req.params;

      const pasien = await pasienSchema.findById(id);

      if (!pasien) {
        return res.json({
          status: false,
          statusCode: 404,
          message: "Pasien not found",
        });
      }

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully fetched pasien by id",
        data: pasien,
      });
    } catch (err) {
      res.json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        details: err.message,
      });
    }
  }

  static async createPasien(req, res) {
    try {
      const { nama, tanggal_lahir, jenis_kelamin, asuransi } = req.body;
      let errorDetails = [];
      if (!nama || nama === "") {
        errorDetails.push("nama is Required");
      }

      if (!tanggal_lahir || tanggal_lahir === "") {
        errorDetails.push("tanggal_lahir is Required");
      }

      if (!jenis_kelamin || jenis_kelamin === "") {
        errorDetails.push("jenis_kelamin is Required");
      }

      if (!asuransi || asuransi === "") {
        errorDetails.push("asuransi is Required");
      }

      if (errorDetails.length > 0) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request",
          details: errorDetails,
        });
      }

      const pasien = new pasienSchema({
        nama,
        tanggal_lahir,
        jenis_kelamin,
        asuransi,
      });

      await pasien.save();

      res.status(201).json({
        status: true,
        statusCode: 201,
        message: "Successfully created pasien",
        data: pasien,
      });
    } catch (err) {
      console.error(err);
      let statusCode = 500;
      let message = "Failed to create pasien";

      if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
      } else if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
      }

      res.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        message: message,
      });
    }
  }
  static async updatePasien(req, res) {
    try {
      const { id } = req.params;
      const { nama, tanggal_lahir, jenis_kelamin, asuransi } = req.body;
      const updateData = {};
      let errorDetails = [];

      // Validasi data yang akan diupdate (hanya cek jika ada di body)
      if (nama !== undefined && nama !== "") {
        updateData.nama = nama;
      } else if (nama === "") {
        errorDetails.push("nama tidak boleh kosong");
      }

      if (tanggal_lahir !== undefined && tanggal_lahir !== "") {
        updateData.tanggal_lahir = tanggal_lahir;
      } else if (tanggal_lahir === "") {
        errorDetails.push("tanggal_lahir tidak boleh kosong");
      }

      if (jenis_kelamin !== undefined && jenis_kelamin !== "") {
        updateData.jenis_kelamin = jenis_kelamin;
      } else if (jenis_kelamin === "") {
        errorDetails.push("jenis_kelamin tidak boleh kosong");
      }

      if (asuransi !== undefined && asuransi !== "") {
        updateData.asuransi = asuransi;
      } else if (asuransi === "") {
        errorDetails.push("asuransi tidak boleh kosong");
      }

      // Cek jika ada error validasi
      if (errorDetails.length > 0) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request: Data tidak valid",
          details: errorDetails,
        });
      }

      // Cek jika tidak ada data yang akan diupdate
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request: Tidak ada data yang dikirim untuk diupdate",
        });
      }

      // Lakukan update data
      const pasien = await pasienSchema.findByIdAndUpdate(
        id,
        { $set: updateData }, // Menggunakan $set untuk mengupdate hanya field yang ada di updateData
        { new: true, runValidators: true } // new: true mengembalikan dokumen yang sudah diupdate, runValidators: true menjalankan validasi skema
      );

      // Cek jika pasien tidak ditemukan
      if (!pasien) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          message: "Pasien not found",
        });
      }
      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully updated pasien",
        data: pasien,
      });
    } catch (err) {
      console.error(err);
      let statusCode = 500;
      let message = "Failed to update pasien";

      // Menangani error validasi dari Mongoose (misalnya tipe data salah)
      if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
      } else if (err.name === "CastError") {
        // Menangani jika ID yang diberikan tidak valid
        statusCode = 400;
        message = "Invalid Pasien ID format";
      } else if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
      }
      res.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        message: message,
      });
    }
  }
}

export default PasienController;
