const Post = require("../models/post");
const { successHandle, errorHandle } = require("../service/helpers");
const mongoose = require("mongoose");
const posts = {
  async getPosts(req, res) {
    const post = await Post.find();
    successHandle({ res, data: post, message: "取得全部貼文成功" });
  },
  async createPosts({ body, req, res }) {
    try {
      const { name, content, image } = JSON.parse(body);
      if (!name || !content) return errorHandle(res, "欄位填寫錯誤");
      const newPost = await Post.create({
        name,
        content,
        image,
      });
      successHandle({ res, data: newPost, message: "新增一筆貼文成功" });
    } catch (error) {
      errorHandle(res, error.message);
    }
  },
  async deletePosts(req, res) {
    await Post.deleteMany();
    successHandle({ res, message: "刪除所有貼文成功" });
  },
  async deletePost(req, res) {
    const id = req.url.split("/").pop();
    if (!mongoose.Types.ObjectId.isValid(id))
      return errorHandle(res, "id 格式錯誤");

    const data = await Post.findByIdAndDelete(id);
    if (!data) return errorHandle(res, "找不到該筆資料");

    successHandle({ res, message: "刪除一筆貼文成功" });
  },
  async patchPost({body,req, res}) {
    try {
      const id = req.url.split("/").pop();
      const { name, content, image } = JSON.parse(body);
      if (!mongoose.Types.ObjectId.isValid(id))
        return errorHandle(res, "id 格式錯誤");

      const uadatePost = await Post.findByIdAndUpdate(
        id,
        {
          name,
          content,
          image,
        },
        { new: true }
      );
      if (!uadatePost) return errorHandle(res, "找不到該筆資料");
      successHandle({ res, data: uadatePost, message: "更新一筆貼文成功" });
    } catch (error) {
      errorHandle(res, error.message);
    }
  },
};

module.exports = posts;
