const { fetchArticle } = require("../models/articles-models");
const {
  fetchCommentsByArticleId,
  makeComment,
} = require("../models/comments-models");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id: id } = req.params;

    const [{ rows: comments }] = await Promise.all([
      fetchCommentsByArticleId(id),
      fetchArticle(id),
    ]);

    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const { article_id: id } = req.params;
    const { username, body } = req.body;

    const {
      rows: [comment],
    } = await makeComment(id, username, body);

    res.status(201).send(comment);
  } catch (err) {
    next(err);
  }
};
