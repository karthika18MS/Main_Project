import Service from "../models/service.model.js";

export const addService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

export const getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};
