import Drug from "../Models/drugModel.js";

export const getAllDrugs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const totalDrugsCount = await Drug.countDocuments();

        const drugs = await Drug.find()
            .sort({ launchDate: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        res.status(200).json({
            totalDrugsCount,
            page,
            pageSize: drugs.length,
            totalPages: Math.ceil(totalDrugsCount / limit),
            data: drugs,
        });
    } catch (error) {
        console.error("Error fetching drugs:", error);
        res.status(500).json({ message: error.message });
    }
}