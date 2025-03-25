import db from "../models";

//get all category
export const getCategoriesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get all category successfully"
          : "Get all category failed",
        response,
      });
    } catch (error) {
      reject();
    }
  });
