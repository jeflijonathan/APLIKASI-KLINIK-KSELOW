import pasienSchema from "#models/pasien.model.js";
class PasienController {
  static async getAllPasien(req, res) {
    try {
      let { page = 1, limit = 10, search, jenis_kelamin, asuransi } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};

      // Search by nama
      if (search) {
        filter.nama = { $regex: search, $options: "i" };
      }

      // Filter by jenis_kelamin
      if (jenis_kelamin) {
        filter.jenis_kelamin = jenis_kelamin;
      }

      // Filter by asuransi
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
        errorDetails.push("tanggal_lahir is Required"); // PERBAIKAN TYPO
      }

      // Anda juga harus memvalidasi jenis_kelamin dan asuransi
      if (!jenis_kelamin || jenis_kelamin === "") {
        errorDetails.push("jenis_kelamin is Required");
      }

      if (!asuransi || asuransi === "") {
        errorDetails.push("asuransi is Required");
      }

      // PERBAIKAN: Cek jika array memiliki item (panjang > 0)
      if (errorDetails.length > 0) {
        return res.status(400).json({
          // Lebih baik mengembalikan respons langsung di sini
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

  static async updatePasien(req, res) {}
}

export default PasienController;
