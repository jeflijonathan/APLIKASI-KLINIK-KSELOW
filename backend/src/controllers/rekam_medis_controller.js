import RekamMedis from "#models/rekam_medis_model.js";
import Pasien from "#models/pasien.model.js";

class RekamMedisController {
  static async getAll(req, res) {
    try {
      let { page = 1, limit = 10, search } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};
      if (search) {
        filter.diagnosa = { $regex: search, $options: "i" };
      }

      const totalData = await RekamMedis.countDocuments(filter);

      const data = await RekamMedis.find(filter)
        .populate("pasien", "nama")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully fetched data rekam medis",
        data,
        total: totalData,
        pagination: {
          totalData,
          currentPage: page,
          totalPages: Math.ceil(totalData / limit),
          limit,
        },
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

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const record = await RekamMedis.findById(id).populate("pasien");

      if (!record) {
        return res.json({
          status: false,
          statusCode: 404,
          message: "Rekam medis not found",
        });
      }

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully fetched rekam medis by id",
        data: record,
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

  static async create(req, res) {
    try {
      let {
        pasien,
        nama,
        tanggal,
        keluhan,
        dokter,
        beratBadan,
        tekananDarah,
        suhuBadan,
        diagnosa,
        resep,
        catatan,
      } = req.body;

      let errorDetails = [];
      if (!keluhan) errorDetails.push("keluhan is required");
      if (!dokter) errorDetails.push("dokter is required");
      if (!beratBadan) errorDetails.push("beratBadan is required");
      if (!tekananDarah) errorDetails.push("tekananDarah is required");
      if (!suhuBadan) errorDetails.push("suhuBadan is required");
      if (!diagnosa) errorDetails.push("diagnosa is required");

      if ((!pasien || pasien === "" || pasien == null) && nama) {
        const nameTrim = String(nama).trim();
        let pasienByName = await Pasien.findOne({
          nama: { $regex: `^${nameTrim}$`, $options: "i" },
        });

        if (!pasienByName) {
          pasienByName = await Pasien.findOne({
            nama: { $regex: nameTrim, $options: "i" },
          });
        }
        if (pasienByName) pasien = pasienByName._id;
      }

      if (!pasien || pasien == "" || pasien == null) {
        errorDetails.push("pasien is required");
      }

      const pasienExist = pasien ? await Pasien.findById(pasien) : null;
      if (pasien && !pasienExist) errorDetails.push("pasien tidak ditemukan!");

      if (errorDetails.length > 0) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request",
          details: errorDetails,
        });
      }

      let resepData = [];
      if (Array.isArray(resep)) {
        resepData = resep;
      } else if (typeof resep === "string") {
        resepData = resep
          .split(",")
          .map((r) => r.trim())
          .filter((r) => r.length > 0);
      }

      const rekam = new RekamMedis({
        pasien,
        tanggal: tanggal || new Date(),
        keluhan,
        dokter,
        beratBadan,
        tekananDarah,
        suhuBadan,
        diagnosa,
        resep: resepData,
        catatan: catatan || "",
      });

      await rekam.save();

      res.status(201).json({
        status: true,
        statusCode: 201,
        message: "Successfully created rekam medis",
        data: rekam,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        statusCode: err.statusCode || 500,
        message: "Failed to create rekam medis",
        details: err.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        pasien,
        keluhan,
        dokter,
        beratBadan,
        tekananDarah,
        suhuBadan,
        diagnosa,
        resep,
        catatan,
        isActive,
      } = req.body;

      const updateData = {};
      let errorDetails = [];

      if (keluhan !== undefined) {
        if (keluhan === "") errorDetails.push("keluhan tidak boleh kosong");
        else updateData.keluhan = keluhan;
      }

      if (dokter !== undefined) {
        if (dokter === "") errorDetails.push("dokter tidak boleh kosong");
        else updateData.dokter = dokter;
      }
      if (pasien !== undefined) {
        const pasienExist = await Pasien.findById(pasien);
        if (!pasienExist) errorDetails.push("pasien tidak ditemukan");
        else updateData.pasien = pasien;
      }

      if (beratBadan !== undefined) updateData.beratBadan = beratBadan;
      if (tekananDarah !== undefined) updateData.tekananDarah = tekananDarah;
      if (suhuBadan !== undefined) updateData.suhuBadan = suhuBadan;

      if (diagnosa !== undefined) {
        if (diagnosa === "") errorDetails.push("diagnosa tidak boleh kosong");
        else updateData.diagnosa = diagnosa;
      }

      if (resep !== undefined) {
        if (Array.isArray(resep)) {
          updateData.resep = resep;
        } else if (typeof resep === "string") {
          updateData.resep = resep
            .split(",")
            .map((r) => r.trim())
            .filter((r) => r.length > 0);
        }
      }

      if (catatan !== undefined) updateData.catatan = catatan;

      if (isActive !== undefined) updateData.isActive = isActive;

      if (errorDetails.length > 0) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request",
          details: errorDetails,
        });
      }

      const record = await RekamMedis.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!record) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          message: "Rekam medis not found",
        });
      }

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully updated rekam medis",
        data: record,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Failed to update rekam medis",
        details: err.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const data = await RekamMedis.findByIdAndDelete(id);

      if (!data) {
        return res.status(404).json({
          message: "Rekam medis tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Rekam medis berhasil dihapus",
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default RekamMedisController;
