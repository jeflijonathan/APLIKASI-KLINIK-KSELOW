import Pasien from "#models/pasien.model.js";
class PasienController {
  static async getAllPasien(req, res) {
    try {
      let { page = 1, limit = 10, search } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};

      if (search) {
        filter.nama = { $regex: search, $options: "i" };
      }

      const totalData = await Pasien.countDocuments(filter);

      const data = await Pasien.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ nama: 1 });

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully fetched data pasien",
        data: data,
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

      const pasien = await Pasien.findById(id);

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

      if (!nama || nama == "") {
        errorDetails.push("nama is Required");
      }

      if (!tanggal || tanggal_lahir == "") {
        errorDetails.push("nama is Required");
      }

      if (errorDetails) {
        throw {
          statusCode: 400,
          message: "Bad Request",
          details: errorDetails,
        };
      }

      const pasien = new Pasien({
        nama,
        tanggal_lahir,
        jenis_kelamin,
        asuransi,
      });

      const savedPasien = await pasien.save();

      res.json({
        status: true,
        statusCode: 201,
        message: "Successfully created pasien",
        data: savedPasien,
      });
    } catch (err) {
      res.json({
        status: false,
        statusCode: 400,
        message: "Failed to create pasien",
      });
    }
  }

  static async updatePasien(req, res) {}
}

export default PasienController;
