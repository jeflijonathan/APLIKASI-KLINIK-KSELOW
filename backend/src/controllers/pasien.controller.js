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
      const {
        statusCode = 500,
        message = "Failed to update pasien",
        details,
      } = err;

      res.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        message: message,
        details: details,
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
      const {
        statusCode = 500,
        message = "Failed to update pasien",
        details,
      } = err;

      res.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        message: message,
        details: details,
      });
    }
  }
  static async updatePasien(req, res) {
    try {
      const { id } = req.params;
      const { nama, tanggal_lahir, jenis_kelamin, asuransi } = req.body;
      const updateData = {};
      let errorDetails = [];

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

      if (errorDetails.length > 0) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request: Data tidak valid",
          details: errorDetails,
        });
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request: Tidak ada data yang dikirim untuk diupdate",
        });
      }

      const pasien = await pasienSchema.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

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
      const {
        statusCode = 500,
        message = "Failed to update pasien",
        details,
      } = err;

      res.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        message: message,
        details: details,
      });
    }
  }

  static async getPasienOptions(req, res) {
    try {
      const data = await pasienSchema.find({}).select({ _id: 1, nama: 1 });
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Successfully Fetched Pasien Options",
        data,
      });
    } catch (err) {
      const {
        statusCode = 500,
        message = "Failed to update pasien",
        details,
      } = err;

      res.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        message: message,
        details: details,
      });
    }
  }
}

export default PasienController;
