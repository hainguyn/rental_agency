import db from "../models";
const { Op, Sequelize } = require("sequelize");
import { v4 as generateId } from "uuid";
import generateCode from "../ultils/generateCode";
import moment from "moment";
import generateDate from "../ultils/generateDate";

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get all posts successfully" : "Get all posts failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitService = (
  page,
  { limitPost, order, keyword, ...query },
  { priceNumber, areaNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query };
      const limit = +limitPost || +process.env.LIMIT;
      queries.limit = limit;
      if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber) query.areaNumber = { [Op.between]: areaNumber };
      if (order) queries.order = [order];
      if (keyword) {
        const keywords = Array.isArray(keyword) ? keyword[0] : keyword;
        const formattedKeyword = keywords.trim().split(/\s+/).filter(Boolean);
        query[Op.or] = [
          { address: { [Op.like]: `% ${keyword} %` } },
          { title: { [Op.like]: `% ${keyword} %` } },
          ...formattedKeyword.map((kw) => ({
            "$labelData.value$": { [Op.like]: `% ${kw} %` }, // Tìm trong value của Label
          })),
          ...formattedKeyword.map((kw) => ({
            "$overviews.area$": { [Op.like]: `%${kw}%` }, // Tìm trong trường `area` của bảng Overview
          })),
        ];
        queries.order = [
          [
            Sequelize.literal(
              formattedKeyword
                .map(
                  (kw) =>
                    `(CASE WHEN title LIKE '%${kw}%' THEN 1 ELSE 0 END + 
                  CASE WHEN address LIKE '%${kw}%' THEN 1 ELSE 0 END + 
                  CASE WHEN labelData.value LIKE '%${kw}%' THEN 1 ELSE 0 END)`
                )
                .join(" + ") + " DESC"
            ),
          ],
          [Sequelize.literal(`labelData.value LIKE '${keyword}' DESC`)], // Khớp chính xác lên đầu
          ["createdAt", "DESC"], // Sau đó sắp xếp theo ngày tạo
        ];
      }
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * limit,
        // order: [["createdAt", "DESC"]],
        ...queries,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["id", "name", "zalo", "phone", "avatar"],
          },
          {
            model: db.Overview,
            as: "overviews",
          },
          {
            model: db.Label,
            as: "labelData",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get posts limit successfully" : "Get all posts failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createNewPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const imagesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentDate = generateDate();
      await db.Post.create({
        id: generateId(),
        title: body.title || null,
        labelCode,
        address: body.address || null,
        attributesId,
        categoryCode: body.categoryCode || null,
        description: JSON.stringify(body.description) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body?.province?.includes("Thành phố")
          ? generateCode(body.province?.replace("Thành phố ", ""))
          : generateCode(body.province?.replace("Tỉnh ", "")) || null,
        areaNumber: body.areaNumber,
        priceNumber: body.priceNumber,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${+body.areaNumber}m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body?.images),
      });
      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: body.label,
        type: body.category,
        target: body.target,
        bonus: "Tin thường",
        created: currentDate.today,
        expired: currentDate.expireDate,
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body.province?.replace("Thành phố ", "") },
            { value: body.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body.province?.replace("Thành phố ", ""))
            : generateCode(body.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body.province?.replace("Thành phố ", "")
            : body.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitAdminService = (page, id, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query, userId: id };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
          {
            model: db.Overview,
            as: "overviews",
          },
        ],
        // attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get posts limit admin successfully"
          : "Get all posts failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updatePostService = ({
  postId,
  overviewId,
  imagesId,
  attributesId,
  ...body
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label);
      await db.Post.update(
        {
          title: body.title || null,
          labelCode,
          address: body.address || null,
          categoryCode: body.categoryCode || null,
          description: JSON.stringify(body.description) || null,
          areaCode: body.areaCode || null,
          priceCode: body.priceCode || null,
          provinceCode: body?.province?.includes("Thành phố")
            ? generateCode(body.province?.replace("Thành phố ", ""))
            : generateCode(body.province?.replace("Tỉnh ", "")) || null,
          areaNumber: body.areaNumber,
          priceNumber: body.priceNumber,
        },
        { where: { id: postId } }
      );

      await db.Attribute.update(
        {
          price:
            +body.priceNumber < 1
              ? `${+body.priceNumber * 1000000} đồng/tháng`
              : `${body.priceNumber} triệu/tháng`,
          acreage: `${+body.areaNumber}m2`,
        },
        { where: { id: attributesId } }
      );

      await db.Image.update(
        {
          image: JSON.stringify(body?.images),
        },
        { where: { id: imagesId } }
      );

      await db.Overview.update(
        {
          area: body.label,
          type: body.category,
          target: body.target,
        },
        { where: { id: overviewId } }
      );

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body.province?.replace("Thành phố ", "") },
            { value: body.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body.province?.replace("Thành phố ", ""))
            : generateCode(body.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body.province?.replace("Thành phố ", "")
            : body.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: 0,
        msg: "Update post successfully",
      });
    } catch (error) {
      reject(error);
    }
  });

export const deletePostService = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: {
          id: postId,
        },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Delete post successfully" : "Delete post failed",
      });
    } catch (error) {
      reject(error);
    }
  });
