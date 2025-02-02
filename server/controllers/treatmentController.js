import Treatment from '../models/Treatment.js';
import Detection from '../models/Detection.js';

export const addDetectionToReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const detectionData = req.body;

        const detection = new Detection({
            ...detectionData,
            seance: reportId
        });
        await detection.save();

        const medicalReport = await MedicalReport.findById(reportId);
        if (!medicalReport) {
            return res.status(404).send({ message: 'Medical report not found' });
        }

        medicalReport.detections.push(detection._id);
        await medicalReport.save();

        res.status(201).send(detection);
    } catch (error) {
        res.status(400).send(error);
    }
};
export const createTreatment = async (req, res) => {
    try {
        const treatment = new Treatment(req.body);
        await treatment.save();
        res.status(201).send(treatment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find();
        res.status(200).send(treatments);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getTreatmentById = async (req, res) => {
    try {
        const treatment = await Treatment.findById(req.params.id);
        if (!treatment) {
            return res.status(404).send();
        }
        res.status(200).send(treatment);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!treatment) {
            return res.status(404).send();
        }
        res.status(200).send(treatment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findByIdAndDelete(req.params.id);
        if (!treatment) {
            return res.status(404).send();
        }
        res.status(200).send(treatment);
    } catch (error) {
        res.status(500).send(error);
    }
};
export const addTreatmentToReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const treatmentData = req.body;

        const treatment = new Treatment({
            ...treatmentData,
            id_mage: reportId
        });
        await treatment.save();

        const medicalReport = await MedicalReport.findById(reportId);
        if (!medicalReport) {
            return res.status(404).send({ message: 'Medical report not found' });
        }

        medicalReport.treatments.push(treatment._id);
        await medicalReport.save();

        res.status(201).send(treatment);
    } catch (error) {
        res.status(400).send(error);
    }
};

 
export const getTreatmentsForReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const medicalReport = await MedicalReport.findById(reportId).populate('treatments');

        if (!medicalReport) {
            return res.status(404).send({ message: 'Medical report not found' });
        }

        res.status(200).send(medicalReport.treatments);
    } catch (error) {
        res.status(500).send(error);
    }
};