const FAQ = require('../models/faqModel');

exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ active: true });
    res.status(200).json({
      status: 'success',
      results: faqs.length,
      data: faqs
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.createFAQ = async (req, res) => {
  try {
    const newFaq = await FAQ.create(req.body);
    res.status(201).json({ status: 'success', data: newFaq });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'No FAQ found with that ID' });
  }
};