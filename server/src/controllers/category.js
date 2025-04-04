import * as services from "../services/category";
export const getCategoriesController = async (req, res) => {
  try {
    const response = await services.getCategoriesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at category controller: " + error,
    });
  }
};
